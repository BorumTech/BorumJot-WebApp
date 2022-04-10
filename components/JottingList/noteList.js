import FetchError from "../FetchError/fetchError";
import NotePreview from "../Jotting/notePreview";
import jottingList from "./jottingList.module.css";

export default function 	NoteList({ notes }) {
	let noteList = <FetchError itemName="notes" />;

	if (notes instanceof Array) {
		noteList = notes
			.filter((item) => {
				const urlParser = new URLSearchParams(location.search);
				
				const labelIsNotRelevant = !urlParser.has("label") || item.owner === "shared" || !item.labels;

				const jotHasLabel = labelIsNotRelevant || Array.isArray(Object.values(item.labels)) && Object.values(item.labels).some(item => item.name.toLocaleLowerCase() === urlParser.get("label").toLocaleLowerCase());

				return (
					(
						!urlParser.has("q") ||
						item.title.toLocaleLowerCase().includes(urlParser.get("q").toLocaleLowerCase())
					) && jotHasLabel
				);
			})
			.map((item) => (
				<li key={item.id}>
					<NotePreview {...item} />
				</li>
			));
	}

	return <ul className={jottingList.jottingList}>{noteList}</ul>;
}
