import jotting from "./jotting.module.css";
import Jotting from "./jotting";
import JottingDetails from "./jottingDetails";
import JottingOptionsBar from "./JottingOptionsBar";
import SubtaskList from "./subtaskList";
import CreateJottingButton from "../CreateJottingButton/createJottingButton";
import { useState } from "react";

export default function Task(task) {
	return (
		<Jotting jotType="task" {...task}>
			<JottingOptionsBar {...task} />
			<JottingDetails jotType="task" jottingInfo={task} />
			<SubtasksControl task={task} />
		</Jotting>
	);
}

function SubtasksControl({task}) {
	const [subtasks, setSubtasks] = useState(null);
	return (
		<div className={jotting.subtasksControl}>
			<h3 className={jotting.subtaskHeading}>Subtasks</h3>
			<SubtaskList id={task.id} subtasksState={[subtasks, setSubtasks]}/>
			<CreateJottingButton
				requestFunc="createSubtask"
				jotType="subtask"
                jots={subtasks}
                setJots={setSubtasks}
                requestArg1={task.id}
			/>
		</div>
	);
}
