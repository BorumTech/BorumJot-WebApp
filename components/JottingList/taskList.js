import FetchError from "../FetchError/fetchError";
import TaskPreview from "../Jotting/taskPreview";
import jottingList from "./jottingList.module.css";

export default function TaskList({ tasks }) {
	let taskList = <FetchError itemName="tasks" />;

	if (tasks instanceof Array) {
		taskList = tasks
			.filter((item) => {
				const urlParser = new URLSearchParams(location.search);
				return (
					!urlParser.has("q") ||
					item.title.toLocaleLowerCase().includes(urlParser.get("q").toLocaleLowerCase())
				);
			})
			.map((item) => (
				<li key={item.id}>
					<TaskPreview {...item} />
				</li>
			));
	}

	return <ul className={jottingList.jottingList}>{taskList}</ul>;
}
