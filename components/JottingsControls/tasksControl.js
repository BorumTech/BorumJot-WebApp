import jottingsControl from "./jottingsControl.module.css";
import ProgressSpinner from "../ProgressSpinner/progressSpinner";
import CreateTaskButton from "../CreateJottingButton/createTaskButton";
import TaskList from "../JottingList/taskList";

/**
 * Control for Tasks heading,
 * list for view user tasks, and
 * button to create task
 * @param { { tasksState: [tasks, setTasks] } } props
 * @param { [tasks, setTasks] } props.tasksState
 * @param { {id: number}[] } props.tasksState[0]
 */
export default function TasksControl({ tasksState, active }) {
	const [tasks, setTasks] = tasksState;

	return (
		<article style={{display: active ? 'block' : 'none'}} className={jottingsControl.ownTaskList}>
			<h1>Tasks</h1>
			{tasks ? <TaskList tasks={tasks} /> : <ProgressSpinner />}
			<CreateTaskButton jots={tasks} />
		</article>
	);
}