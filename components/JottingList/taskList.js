import Task from "../Jotting/task";

export default function TaskList({tasks}) {
    return (
        <ul>
            {tasks.map(item => <li key={item.id}><Task {...item} /></li>)}
        </ul>
    );
}