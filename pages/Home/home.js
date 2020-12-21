import home from "./home.module.css";
import SearchBar from "../../components/SearchBar/searchBar";
import NoteList from "../../components/JottingList/noteList";
import TaskList from "../../components/JottingList/taskList";
import CreateNoteButton from "../../components/CreateJottingButton/createNoteButton";
import CreateTaskButton from "../../components/CreateJottingButton/createTaskButton";
import BrandHeader from "../../components/BrandHeader/brandHeader";
import ProgressSpinner from "../../components/CircularProgress/circularProgress";
import AccountBanner from "../../components/AccountBanner/accountBanner";
import { useState, useEffect } from "react";
import { CONTENT_STATE } from "../../libs/view";
import { useRouter } from "next/router";
import Note from "../../components/Jotting/note";
import Task from "../../components/Jotting/task";
import { getJottings } from "../../libs/Datastore/requests";
import Jotting from "../../libs/Jotting";

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

	/**
	 * Checks whether the url is for displaying a single jotting
	 * @description Uses a regular expression to find the component
	 * @param {string} jotType The type of jotting to check for in the url (singular)
	 * @return {boolean} Whether the url matches a jotting to display
	 */
	const urlMatchesDisplayJotting = (jotType) => {
		const urlRegEx = new RegExp(
			"/?" + jotType + "s/([0-9]+)/([A-Za-zs-]+)"
		);
		const decodedUrl = decodeURIComponent(router.asPath);

		let query;
		if ((query = urlRegEx.exec(decodedUrl)) != null) {
			router.query = {
				type: jotType,
				id: parseInt(query[1]),
				title: (() => {
					if (jotType == "note")
						return notes.find((item) => item.id == query[1]).title;
					else if (jotType == "task")
						return tasks.find((item) => item.id == query[1]).title;

					return query[2];
				})(),
			};
			return true;
		}

		return false;
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

			<NoteControl notesState={[notes, setNotes]} />
			<TaskControl tasksState={[tasks, setTasks]} />

			{notes &&
			((router.query.type &&
				router.query.type == "note" &&
				router.query.id) ||
				urlMatchesDisplayJotting("note")) ? (
				<div className={home.fullJotting}>
					<Note
						{...router.query}
					/>
				</div>
			) : (
				""
			)}
			{tasks &&
			((router.query.type &&
				router.query.type == "task" &&
				router.query.id) ||
				urlMatchesDisplayJotting("task")) ? (
				<div className={home.fullJotting}>
					<Task {...tasks.find(item => item.id == router.query.id)} />
				</div>
			) : (
				""
			)}
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
function NoteControl({ notesState }) {
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
function TaskControl({ tasksState }) {
	const [tasks, setTasks] = tasksState;

	return (
		<div className={home.ownTaskList}>
			<h1>Tasks</h1>
			{tasks ? <TaskList tasks={tasks} /> : <ProgressSpinner />}
			<CreateTaskButton jots={tasks} setJots={setTasks} />
		</div>
	);
}
