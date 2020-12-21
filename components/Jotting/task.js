import Jotting from "./Jotting";
import JottingDetails from "./jottingDetails";

export default function Task(task) {
    console.log(task);
    return (
        <Jotting jotType="task" {...task}>
            <JottingDetails jotType="task" jottingInfo={task} />
        </Jotting>
    );
}