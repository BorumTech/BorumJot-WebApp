import NoteControl from "./noteControl";
import TaskControl from "./taskControl";
import LabelControl from "./labelControl";
import NotesControl from "./notesControl";
import TasksControl from "./tasksControl";
import LabelsControl from "./labelsControl";
import { useEffect, useState } from "react";
import { getJottings, getSharedJottings, getLabels, getLabel } from "../../libs/Datastore/requests";
import { useInterval } from "../../libs/delay";
import { compareArrays } from "../../libs/arrayExtensions";
import UrlService from "../../libs/UrlService";
import { useRouter } from "next/router";

export default function JottingsControl(props) {
	const [notes, setNotes] = useState(null);
	const [tasks, setTasks] = useState(null);
	const [labels, setLabels] = useState(null);

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
		const ownAbortController = new AbortController();
		const sharedAbortController = new AbortController();

		if (notes === -1 || tasks === -1) {
			console.info("Interval cleared due to errors");
			clearInterval(interval);
		}

		try {
			let promisesToSettle = [getJottings(ownAbortController), getSharedJottings(sharedAbortController)];
			
			const response = Promise.allSettled(promisesToSettle);

			console.info("Requests to owned and shared jottings started");
			console.debug("Response", await response);

			const notesToShow = getJotsToShow(await response, "notes");
			const tasksToShow = getJotsToShow(await response, "tasks");

			console.log("Response received, data computed");
			console.info("notesToShow", notesToShow);
			console.info("tasksToShow", tasksToShow);

			const notesToShowIsNewData =
				notes == null || compareArrays(notes, notesToShow);

			if (notesToShowIsNewData) {
				setNotes(notesToShow);
				console.log("UI updated");
			}
			if (tasksToShow != tasks) {
				setTasks(tasksToShow);
			}
		} catch (e) {
			console.error("Request Error:", e);
		}
	};

	const makeLabelsRequest = async (interval) => {
		const abortController = new AbortController();

		if (labels === -1) {
			console.error("[makeLabelsRequest] Interval cleared due to errors");
			clearInterval(interval);
		}

		try {
			const response = await getLabels(abortController);
			console.log("Requests to labels started");
			console.log("labels", response);
			
			const labelsToShowIsNewData = labels == null || compareArrays(labels, response);

			if (labelsToShowIsNewData) {
				setLabels(response);
				console.info("labels", labels);
				console.log("UI updated");
			}
		} catch (e) {
			console.error("Request Error:", e);
			setLabels(-1);
		}
	};

	// componentDidMount() - Load the jottings and recurringly update them with requests
	const updateData = useInterval(() => {
		console.group("Interval Cycle");
		Promise.all([
			makeJottingsRequests(updateData), 
			makeLabelsRequest(updateData)
		]).then(() => console.groupEnd("Interval Cycle"))
	}, 10000);

	return (
		<>
			<LabelsControl labelsState={[labels, setLabels]} />
			<NotesControl notesState={[notes, setNotes]} />
			<TasksControl tasksState={[tasks, setTasks]} />
			
			<NoteControl notes={notes} />
			<TaskControl tasks={tasks} />
			<LabelControl labels={labels} />
		</>
	);
}
