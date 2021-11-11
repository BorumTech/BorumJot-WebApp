import { useRouter } from "next/router";
import labelPreview from "./labelPreview.module.css";

export default function LabelPreview(props) {
    const router = useRouter();

	const handleLabelBtnClick = (e) => {
		e.preventDefault();
        const { name } = props;
        router.push(`/?label=${name}`);
	};

	return (
		<button className={labelPreview.previewButton} onClick={handleLabelBtnClick}>
            <span className={labelPreview.title}>{props.name}</span>
		</button>
	);
}