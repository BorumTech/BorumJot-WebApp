import FetchError from "../FetchError/fetchError";
import NotePreview from "../Jotting/notePreview";
import jottingList from "./jottingList.module.css";

export default function NoteList({ notes }) {
	let noteList = <FetchError itemName="notes" />;

	if (notes instanceof Array) {
		noteList = notes
			.filter((item) => {
				const urlParser = new URLSearchParams(location.search);
				return !urlParser.has("q") || item.title.includes(urlParser.get("q"));
			})
			.map((item) => (
				<li key={item.id}>
					<NotePreview {...item} />
				</li>
			));
	}

	return <ul className={jottingList.jottingList}>{noteList}</ul>;
}
