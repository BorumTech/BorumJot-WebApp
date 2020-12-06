import jotting from "./jotting.module.css";
import JottingOptionsBar from "./JottingOptionsBar";

export default function Task(task) {
    return (
        <div className={jotting.fullJotting}>
            <JottingOptionsBar {...task} jotType="task" />
            <p>{task.title}</p>
        </div>
    );
}