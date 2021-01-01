import { useEffect, useState } from "react";
import { deleteTask, getSubtasks } from "../../libs/Datastore/requests";
import CircularProgress from "../CircularProgress/circularProgress";
import FetchError from "../FetchError/fetchError";
import RemoveableListItem from "../RemoveableListItem/removeableListItem";
import StyledCheckbox from "../StyledCheckbox/styledCheckbox";
import jotting from "./jotting.module.css";

/**
 * @param { {id : number } } props The info about the task
 * @param {number} props.id The id of the parent task
 */
export default function SubtaskList({ id, subtasksState }) {
	const [subtasks, setSubtasks] = subtasksState;

	// componentDidMount() - initally request subtasks
	useEffect(() => {
		(async function () {
			try {
				const initialSubtasks = await getSubtasks(id);
				setSubtasks(initialSubtasks);
			} catch {}
		})();
	}, []);

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
						return;
					}
				}
			})
			.catch(alert);
	};

	if (subtasks instanceof Array)
		return (
			<ul className={jotting.subtasks}>
				{subtasks.map((item) => {
					return (
						<RemoveableListItem
							key={item.id}
							handleRemoveClick={handleRemoveClick}
							removeText="X"
							id={"s-" + item.id}
							content={item.title}
						>
							<StyledCheckbox
								id={item.id}
								prefix="subtask-completion-box-"
								completed={item.completed == 1}
							/>
						</RemoveableListItem>
					);
				})}
			</ul>
		);
	else if (subtasks != null) return <FetchError itemName="subtasks" />;
	else return <CircularProgress />;
}
