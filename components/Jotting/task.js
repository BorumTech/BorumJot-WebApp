import jotting from "./jotting.module.css";
import JottingOptionsBar from "./JottingOptionsBar";
import JottingTitle from "./jottingTitle";

export default function Task(task) {
    return (
        <div className={jotting.fullJotting}>
            <JottingOptionsBar {...task} jotType="task" />
            <JottingTitle id={task.id} originalTitle={task.title} jotType="task" />
        </div>
    );
}