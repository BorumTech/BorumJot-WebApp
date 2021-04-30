import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import AccountBanner from "../../components/AccountBanner/accountBanner";
import BrandHeader from "../../components/BrandHeader/brandHeader";
import BrowserCompatibilityInfo from "../../components/BrowserCompatibilityInfo/browserCompatibilityInfo";
import ProgressSpinner from "../../components/CircularProgress/circularProgress";
import CreateNoteButton from "../../components/CreateJottingButton/createNoteButton";
import CreateTaskButton from "../../components/CreateJottingButton/createTaskButton";
import Note from "../../components/Jotting/note";
import Task from "../../components/Jotting/task";
import NoteList from "../../components/JottingList/noteList";
import TaskList from "../../components/JottingList/taskList";
import SearchBar from "../../components/SearchBar/searchBar";
import ShareMenu from "../../components/ShareMenu/shareMenu";
import { getJottings, getSharedJottings } from "../../libs/Datastore/requests";
import UrlService from "../../libs/UrlService";
import {
	CONTENT_STATE,
	useEscapeAlerter,
	useOutsideAlerter,
} from "../../libs/view";
import home from "./home.module.css";

export default function Home({ fade, onFadeInLogin, setFade }) {
	const [notes, setNotes] = useState(null);
	const [tasks, setTasks] = useState(null);

	const ownAbortController = new AbortController();
	const sharedAbortController = new AbortController();

	const getNotesToShow = (response) => {
		if (
			response[1].status === "rejected" &&
			response[0].status === "fulfilled"
		)
			return response[0].value.notes;
		else if (
			response[1].status === "fulfilled" &&
			response[0].status === "fulfilled"
		)
			return [...response[0].value.notes, ...response[1].value];
		else if (
			response[0].status === "rejected" &&
			response[1].status === "fulfilled"
		)
			return response[1].value;

		return -1;
	};

	const getTasksToShow = (response) => {
		if (response[0].status === "fulfilled") return response[0].value.tasks;
		else return -1;
	};

	// componentDidMount() - Load the jottings and recurringly update them with requests
	useEffect(() => {
		const makeJottingsRequests = async (interval) => {
			// if (notes === -1 || tasks === -1) clearInterval(interval);

			const response = Promise.allSettled([
				getJottings(ownAbortController),
				getSharedJottings(sharedAbortController),
			]);

			try {
				const notesToShow = getNotesToShow(await response);
				const tasksToShow = getTasksToShow(await response);

				const notesHasNewValidData =
					notesToShow != notes &&
					notesToShow !== -1 &&
					(notes instanceof Array || notes == null);

				const tasksHasNewValidData = tasksToShow != tasks;

				if (notesHasNewValidData) setNotes(notesToShow);
				if (tasksHasNewValidData) setTasks(tasksToShow);
			} catch (e) {
				console.error(e);
				// setNotes(-1);
				// setTasks(-1);
			}
		};

		// const updateData = setInterval(() => {
		makeJottingsRequests(/* updateData */);
		// }, 3000);

		return () => {
			ownAbortController.abort();
			sharedAbortController.abort();
		}
	}, []);

	const transitionToLogin = () => {
		onFadeInLogin();
		setFade(CONTENT_STATE.INVISIBLE);
	};

	const handleOnAnimationEnd = () => {
		if (fade == CONTENT_STATE.FADE_OUT) {
			transitionToLogin();
		} else if (fade == CONTENT_STATE.FADE_IN) {
			setFade(CONTENT_STATE.VISIBLE);
		}
	};

	return (
		<main
			onAnimationEnd={handleOnAnimationEnd}
			className={
				fade == CONTENT_STATE.INVISIBLE ? fade : `${fade} ${home.main}`
			}
		>
			<BrandHeader />
			<SearchBar />

			<BrowserCompatibilityInfo />

			<AccountBanner setFade={setFade} />

			<NotesControl notesState={[notes, setNotes]} />
			<TasksControl tasksState={[tasks, setTasks]} />

			<NoteControl notes={notes} />
			<TaskControl tasks={tasks} />
		</main>
	);
}

/**
 * Control for Notes heading,
 * list for view user notes, and
 * button to create note
 * @param { { notesState: [notes, setNotes] } } props
 * @param props.notesState The array returned from useState for the notes state
 * @param props.notesState[0] The value of notes
 * @param props.notesState[1] The Dispatch to set a new value to the notes state
 */
function NotesControl({ notesState }) {
	const [notes, setNotes] = notesState;

	return (
		<div className={home.ownNoteList}>
			<h1>Notes</h1>
			{notes ? <NoteList notes={notes} /> : <ProgressSpinner />}
			<CreateNoteButton jots={notes} setJots={setNotes} />
		</div>
	);
}

/**
 * Control for Tasks heading,
 * list for view user tasks, and
 * button to create task
 * @param { { tasksState: [tasks, setTasks] } } props
 * @param { [tasks, setTasks] } props.tasksState
 * @param { {id: number}[] } props.tasksState[0]
 */
function TasksControl({ tasksState }) {
	const [tasks, setTasks] = tasksState;

	return (
		<div className={home.ownTaskList}>
			<h1>Tasks</h1>
			{tasks ? <TaskList tasks={tasks} /> : <ProgressSpinner />}
			<CreateTaskButton jots={tasks} setJots={setTasks} />
		</div>
	);
}

function TaskControl({ tasks }) {
	const router = useRouter();
	const urlService = new UrlService(router);
	const ref = useRef(null);

	useOutsideAlerter(ref, router);

	// Escape the jot popup when Escape is pressed
	useEscapeAlerter(router);

	urlService.setQueryToJottingInfo("task");

	return tasks &&
		((router.query.type &&
			router.query.type == "task" &&
			router.query.id) ||
			urlService.queryHasJottingInfo("task")) ? (
		<div ref={ref} className={`${home.fullJotting} ${home.taskControl}`}>
			<Task {...tasks.find((item) => item.id == router.query.id)} />
		</div>
	) : (
		""
	);
}

function NoteControl({ notes }) {
	const router = useRouter();
	const [showShareMenu, setShowShareMenu] = useState(false);

	const ref = useRef(null);

	// Escape the jot popup when Escape is pressed or the user clicks outside this component
	useOutsideAlerter(ref, router);
	useEscapeAlerter(router);

	const urlService = new UrlService(router);
	const showNote =
		notes &&
		((router.query.type &&
			router.query.type == "note" &&
			router.query.id) ||
			urlService.queryHasJottingInfo("note"));

	useEffect(() => {
		urlService.setQueryToJottingInfo("note");
	}, [notes]);

	if (showNote && router.query.type == "note") {
		return (
			<div ref={showShareMenu ? ref : null} className={home.noteControl}>
				<div
					ref={showShareMenu ? null : ref}
					className={home.jottingContent}
				>
					<Note
						note={router.query}
						showShareMenuState={[showShareMenu, setShowShareMenu]}
					/>
				</div>

				{showShareMenu && router.query.type == "note" ? (
					<ShareMenu setShowShareMenu={setShowShareMenu} />
				) : (
					""
				)}
			</div>
		);
	}

	return null;
}
