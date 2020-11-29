import FetchError from "../FetchError/fetchError";
import Task from "../Jotting/task";
import jottingList from "./jottingList.module.css";

export default function TaskList({tasks}) {
    let taskList = <FetchError itemName="tasks" />;
    
    if (tasks instanceof Array) {
        taskList = tasks.map(item => <li key={item.id}><Task {...item} /></li>);
    }

    return (
        <ul className={jottingList.jottingList}>{taskList}</ul>
    );
}