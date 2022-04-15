import { useState } from "react";
import CreateJottingButton from "../CreateJottingButton/createJottingButton";
import SubtaskList from "./subtaskList";
import jotting from "./jotting.module.css";

export default function SubtasksControl({ task }) {
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