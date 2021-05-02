import jotting from "./jotting.module.css";
import Jotting from "./jotting";
import JottingDetails from "./jottingDetails";
import JottingOptionsBar from "./JottingOptionsBar";
import SubtaskList from "./subtaskList";
import CreateJottingButton from "../CreateJottingButton/createJottingButton";
import { useState } from "react";
import StyledCheckbox from "../StyledCheckbox/styledCheckbox";
import ShareButton from "../ShareButton/shareButton";

export default function Task(task) {
	return (
		<Jotting jotType="task" {...task}>
			<JottingOptionsBar jotType="task" {...task}>
				<ShareButton showShareMenuState={task.showShareMenuState} />
				<div>
					<StyledCheckbox
						id={task.id}
						prefix="task-completion-box-"
						completed={task.completed == 1}
					/>
				</div>
			</JottingOptionsBar>
			<JottingDetails jotType="task" jottingInfo={task} />
			<SubtasksControl task={task} />
		</Jotting>
	);
}

function SubtasksControl({ task }) {
	const [subtasks, setSubtasks] = useState(null);
	return (
		<div className={jotting.subtasksControl}>
			<h3 className={jotting.subtaskHeading}>Subtasks</h3>
			<SubtaskList id={task.id} subtasksState={[subtasks, setSubtasks]} />
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
