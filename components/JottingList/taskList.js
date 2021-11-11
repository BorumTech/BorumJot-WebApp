import FetchError from "../FetchError/fetchError";
import TaskPreview from "../Jotting/taskPreview";
import jottingList from "./jottingList.module.css";

export default function TaskList({ tasks }) {
	let taskList = <FetchError itemName="tasks" />;

	if (tasks instanceof Array) {
		taskList = tasks
			.filter((item) => {
				const urlParser = new URLSearchParams(location.search);
				
				const labelIsNotRelevant = !urlParser.has("label") || item.owner === "shared" || !item.labels;
				
				if (item.labels) {
					console.info("[TaskList] Labels", Object.values(item.labels));
				}

				const jotHasLabel = labelIsNotRelevant || Array.isArray(Object.values(item.labels)) && Object.values(item.labels).some(item => item.name.toLocaleLowerCase() === urlParser.get("label").toLocaleLowerCase());
				
				return (
					!urlParser.has("q") ||
					item.title.toLocaleLowerCase().includes(urlParser.get("q").toLocaleLowerCase())
				) && jotHasLabel;
			})
			.map((item) => (
				<li key={item.id}>
					<TaskPreview {...item} />
				</li>
			));
	}

	return <ul className={jottingList.jottingList}>{taskList}</ul>;
}
