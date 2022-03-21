import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { compareArrays } from "../../libs/arrayExtensions";
import { getJottings, getLabels, getSharedJottings } from "../../libs/Datastore/requests";
import { useWindowSize } from "../../libs/view";
import LabelControl from "./labelControl";
import LabelsControl from "./labelsControl";
import NoteControl from "./noteControl";
import NotesControl from "./notesControl";
import TaskControl from "./taskControl";
import TasksControl from "./tasksControl";

export default function JottingsControl(props) {
	const [notes, setNotes] = useState(null);
	const [tasks, setTasks] = useState(null);
	const [labels, setLabels] = useState(null);

	const { width } = useWindowSize();
	const [activeList, setActiveList] = useState('labels');

	const router = useRouter();

	useEffect(() => {
		if (width >= 800) {
			setActiveList('all');
		} else {
			setActiveList('labels');
		}
	}, [width]);

    useEffect(() => {
        setActiveList(router.query.list || 'labels');

    }, [router.query]);

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
			console.log("Interval cleared due to errors");
			clearInterval(interval);
		}

		try {
			let promisesToSettle = [getJottings(ownAbortController), getSharedJottings(sharedAbortController)];

			const response = Promise.allSettled(promisesToSettle);

			const notesToShow = getJotsToShow(await response, "notes");
			const tasksToShow = getJotsToShow(await response, "tasks");

			const notesToShowIsNewData =
				notes == null || compareArrays(notes, notesToShow);

			if (notesToShowIsNewData) {
				setNotes(notesToShow);
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
			console.log("[makeLabelsRequest] Interval cleared due to errors");
			clearInterval(interval);
		}

		try {
			const response = await getLabels(abortController);

			const labelsToShowIsNewData = labels == null || compareArrays(labels, response);

			if (labelsToShowIsNewData) {
				setLabels(response);
			}
		} catch (e) {
			console.error("Request Error:", e);
			setLabels(-1);
		}
	};

	useEffect(() => {
		makeLabelsRequest();
		makeJottingsRequests();
	}, []);

	return (
		<>
			<LabelsControl active={['labels', 'all'].includes(activeList)} labelsState={[labels, setLabels]} />
			<NotesControl active={['notes', 'all'].includes(activeList)} notesState={[notes, setNotes]} />
			<TasksControl active={['tasks', 'all'].includes(activeList)} tasksState={[tasks, setTasks]} />

			<NoteControl notes={notes} />
			<TaskControl tasks={tasks} />
			<LabelControl labels={labels} />
		</>
	);
}
