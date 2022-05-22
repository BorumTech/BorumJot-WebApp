import LabelPreview from "../LabelPreview/labelPreview";
import FetchError from "../FetchError/fetchError";
import labelListMod from "./labelList.module.css"

export default function LabelList({ labels }) {
	let labelList = <FetchError itemName="labels" />;
	const urlParser = new URLSearchParams(location.search);

	if (labels instanceof Array) {
		labelList = labels
			.filter(item => !urlParser.has("q") || item.name.toLocaleLowerCase().includes(urlParser.get("q").toLocaleLowerCase()))
			.map((item) => (
				<li key={item.id}>
					<LabelPreview {...item} />
				</li>
			));
	}

	return <ul className={labelListMod.dataList}>{labelList}</ul>;
}