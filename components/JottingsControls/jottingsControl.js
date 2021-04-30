import NoteControl from "./noteControl";
import TaskControl from "./taskControl";
import NotesControl from "./notesControl";
import TasksControl from "./tasksControl";
import { useEffect, useState } from "react";
import { getJottings, getSharedJottings } from "../../libs/Datastore/requests";

export default function JottingsControl(props) {
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

	const makeJottingsRequests = async (interval) => {
		// if (notes === -1 || tasks === -1) clearInterval(interval);

		try {
			const response = Promise.allSettled([
				getJottings(ownAbortController),
				getSharedJottings(sharedAbortController),
			]);

			const notesToShow = getNotesToShow(await response);
			const tasksToShow = getTasksToShow(await response);

			if (notesToShow != notes) setNotes(notesToShow);
			if (tasksToShow != tasks) setTasks(tasksToShow);
		} catch (e) {
			console.error(e);
		}
	};

	// componentDidMount() - Load the jottings and recurringly update them with requests
	useEffect(() => {
		// const updateData = setInterval(() => {
		makeJottingsRequests(/* updateData */);
		// }, 3000);

		return () => {
			ownAbortController.abort();
			sharedAbortController.abort();
		};
	}, []);

	return (
		<>
			<NotesControl notesState={[notes, setNotes]} />
			<TasksControl tasksState={[tasks, setTasks]} />

			<NoteControl notes={notes} />
			<TaskControl tasks={tasks} />
		</>
	);
}
