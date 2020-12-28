import home from "./home.module.css";
import SearchBar from "../../components/SearchBar/searchBar";
import NoteList from "../../components/JottingList/noteList";
import TaskList from "../../components/JottingList/taskList";
import CreateNoteButton from "../../components/CreateJottingButton/createNoteButton";
import CreateTaskButton from "../../components/CreateJottingButton/createTaskButton";
import BrandHeader from "../../components/BrandHeader/brandHeader";
import ProgressSpinner from "../../components/CircularProgress/circularProgress";
import AccountBanner from "../../components/AccountBanner/accountBanner";
import { useState, useEffect, useRef, forwardRef } from "react";
import { CONTENT_STATE, useOutsideAlerter } from "../../libs/view";
import { useRouter } from "next/router";
import Note from "../../components/Jotting/note";
import Task from "../../components/Jotting/task";
import { getJottings } from "../../libs/Datastore/requests";
import Jotting from "../../libs/Jotting";
import UrlService from "../../libs/UrlService";

export default function Home({ fade, onFadeInLogin, setFade }) {
	const [notes, setNotes] = useState(null);
	const [tasks, setTasks] = useState(null);

	const router = useRouter();

	// componentDidMount() - Initally load the jottings to the screen with a request
	useEffect(() => {
		const jottingsRequest = getJottings();
		jottingsRequest
			.then((response) => {
				setNotes(response.notes);
				setTasks(response.tasks);
			})
			.catch((response) => {
				setNotes(-1);
				setTasks(-1);
			});
	}, []);

	// Escape the jot popup when Escape is pressed
	useEffect(() => {
		const handleKeyUp = (e) => {
			if (router.query.id && e.key == "Escape") {
				Jotting.closeJotting(router);
			}
		};

		document.addEventListener("keyup", handleKeyUp);

		return () => document.removeEventListener("keyup", handleKeyUp);
	});

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
	urlService.setQueryToJottingInfo("task");

	return tasks &&
		((router.query.type &&
			router.query.type == "task" &&
			router.query.id) ||
			urlService.queryHasJottingInfo("task")) ? (
		<div ref={ref} className={home.fullJotting}>
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

	useOutsideAlerter(ref, router);

	const urlService = new UrlService(router);
	const showNote =
		notes &&
		((router.query.type &&
			router.query.type == "note" &&
			router.query.id) ||
			urlService.queryHasJottingInfo("note"));
	urlService.setQueryToJottingInfo("note");

	if (showNote) {
		return (
			<div ref={ref} className={home.noteControl}>
				<div className={home.jottingContent}>
					<Note
						note={router.query}
						showShareMenuState={[showShareMenu, setShowShareMenu]}
					/>
				</div>

				<ShareMenu router={router} showShareMenu={showShareMenu} />
			</div>
		);
	}

	return null;
}

function ShareMenu({ router, showShareMenu }) {
	const shareMenuVisibility =
		showShareMenu && router.query.type == "note" ? "visible" : "hidden";

	return (
		<div
			style={{ visibility: shareMenuVisibility }}
			className={home.shareMenu}
		>
			<h1>Share</h1>
			<ul className={home.shareList}>
				<li></li>
			</ul>
			<input type="text" />
			<button>Share</button>
		</div>
	);
}
