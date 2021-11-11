import LabelPreview from "../LabelPreview/labelPreview";
import FetchError from "../FetchError/fetchError";
import labelListMod from "./labelList.module.css"

export default function LabelList({labels}) {
    let labelList = <FetchError itemName="labels" />;

	if (labels instanceof Array) {
		labelList = labels
			.map((item) => (
				<li key={item.id}>
					<LabelPreview {...item} />
				</li>
			));
	}

	return <ul className={labelListMod.dataList}>{labelList}</ul>;
}