import NoteControl from "./noteControl";
import TaskControl from "./taskControl";
import NotesControl from "./notesControl";
import TasksControl from "./tasksControl";
import { useEffect, useState } from "react";
import { getJottings, getSharedJottings } from "../../libs/Datastore/requests";
import { useInterval } from "../../libs/delay";
import { compareArrays } from "../../libs/arrayExtensions";

export default function JottingsControl(props) {
	const [notes, setNotes] = useState(null);
	const [tasks, setTasks] = useState(null);

	const ownAbortController = new AbortController();
	const sharedAbortController = new AbortController();

	const getJotsToShow = (response, jotType) => {
		if (
			response[1].status === "rejected" &&
			response[0].status === "fulfilled"
		)
			return response[0].value[jotType];
		else if (
			response[1].status === "fulfilled" &&
			response[0].status === "fulfilled"
		)
			return [...response[0].value[jotType], ...response[1].value[jotType]];
		else if (
			response[0].status === "rejected" &&
			response[1].status === "fulfilled"
		)
			return response[1].value[jotType];

		return -1;
	};

	const makeJottingsRequests = async (interval) => {
		if (notes === -1 || tasks === -1) {
			console.info("Interval cleared due to errors");
			clearInterval(interval);
		}

		try {
			const response = Promise.allSettled([
				getJottings(ownAbortController),
				getSharedJottings(sharedAbortController),
			]);

			console.info("Requests to owned and shared jottings started");
			console.debug("Response", await response);

			const notesToShow = getJotsToShow(await response, "notes");
			const tasksToShow = getJotsToShow(await response, "tasks");

			console.info("Response received, data computed");
			console.debug("notesToShow", notesToShow);
			console.debug("tasksToShow", tasksToShow);

			const notesToShowIsNewData =
				notes == null || compareArrays(notes, notesToShow);

			if (notesToShowIsNewData) {
				setNotes(notesToShow);
				console.info("UI updated");
			}
			if (tasksToShow != tasks) {
				setTasks(tasksToShow);
			}
		} catch (e) {
			console.error("Request Error:", e);
		}
	};

	// componentDidMount() - Load the jottings and recurringly update them with requests
	const updateData = useInterval(() => {
		console.group("Interval Cycle");
		makeJottingsRequests(updateData).then(() =>
			console.groupEnd("Interval Cycle")
		);
	}, 10000);

	return (
		<>
			<NotesControl notesState={[notes, setNotes]} />
			<TasksControl tasksState={[tasks, setTasks]} />

			<NoteControl notes={notes} />
			<TaskControl tasks={tasks} />
		</>
	);
}
