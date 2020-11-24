import Task from "../Jotting/task";
import jottingList from "./jottingList.module.css";

export default function TaskList({tasks}) {
    return (
        <ul className={jottingList.jottingList}>
            {tasks.map(item => <li key={item.id}><Task {...item} /></li>)}
        </ul>
    );
}