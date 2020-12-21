import FetchError from "../FetchError/fetchError";
import Task from "../Jotting/taskPreview";
import jottingList from "./jottingList.module.css";

export default function TaskList({ tasks }) {
	let taskList = <FetchError itemName="tasks" />;

	if (tasks instanceof Array) {
		taskList = tasks
			.filter((item) => {
				const urlParser = new URLSearchParams(location.search);
				return (
					!urlParser.has("q") ||
					item.title.includes(urlParser.get("q"))
				);
			})
			.map((item) => (
				<li key={item.id}>
					<Task {...item} />
				</li>
			));
	}

	return <ul className={jottingList.jottingList}>{taskList}</ul>;
}
