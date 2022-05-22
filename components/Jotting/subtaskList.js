import { useRouter } from "next/router";
import useSWR from "swr";
import { deleteTask, getSubtasksRequest } from "../../libs/Datastore/requests";
import Jotting from "../../libs/Jotting";
import FetchError from "../FetchError/fetchError";
import ProgressSpinner from "../ProgressSpinner/progressSpinner";
import StyledCheckbox from "../StyledCheckbox/styledCheckbox";
import jotting from "./jotting.module.css";

const fetcher = (id) => getSubtasksRequest(id.substring(2)).makeRequest(new AbortController());

/**
 * @param { {id : number } } props The info about the task
 * @param {number} props.id The id of the parent task
 */
export default function SubtaskList({ id, subtasksState }) {
	const [subtasks, setSubtasks] = subtasksState;
	// Use SWR for performance and conservation of resources (cache), use ST to separate from other useSWR requests
	const { data, error } = useSWR("ST" + id, fetcher);
	const router = useRouter();

	if (!data) return <ProgressSpinner />;
	if (error) return <FetchError itemName="subtasks" />;

	const handleRemoveClick = (e) => {
		const itemId = e.target.parentElement.id.substring(2);
		deleteTask(itemId)
			.then(() => {
				for (let i = 0; i < subtasks.length; i++) {
					if (subtasks[i].id == itemId) {
						const newList = subtasks; // Temporarily store list to prevent state mutation
						newList.splice(i, 1); // Remove the element at the current index
						setSubtasks(null); // Needed for state to actually update
						setSubtasks(newList);
						break;
					}
				}
			})
			.catch(alert);
	};

	return (
		<ul className={jotting.subtasks}>
			{console.info("Subtask Data", data)}
			{data.data.map((item) => {
				return (
					<li key={item.id} className="removeableListItem">
						<StyledCheckbox
							id={item.id}
							prefix="subtask-completion-box-"
							completed={item.completed == 1}
						/>
						<button className={jotting.subtaskTitle} onClick={() => Jotting.openJotting(router, "task", item)}>{item.title}</button>
						<button
							onClick={handleRemoveClick}
							className="removeItemButton"
						>
							X
						</button>
						<ul className={jotting.subsubtasks}>
							{item.subtasks.map(grandchild => (
								<li key={grandchild.id}>
									<StyledCheckbox
										id={grandchild.id}
										prefix="subtask-completion-box-"
										completed={grandchild.completed == 1}
									/>
									<button className={jotting.subtaskTitle} onClick={() => Jotting.openJotting(router, "task", grandchild)}>{grandchild.title}</button>
									<button
										className="removeItemButton"
									>X</button>
								</li>
							))}
						</ul>
					</li>

				);
			})}
		</ul>
	);



}
