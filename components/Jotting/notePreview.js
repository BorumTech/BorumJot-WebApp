import jotting from "./jotting.module.css";
import Jotting from "../../libs/Jotting";
import { useRouter } from "next/router";
import PinImage from "../pinImage";

export default function NotePreview(props) {
	const router = useRouter();

	const handleNoteBtnClick = (e) => {
		Jotting.openJotting(router, "note", props);
	};

	return (
		<data className={jotting.jotting} value={"N" + props.id}>
			<button onClick={handleNoteBtnClick}>
				<span className={jotting.previewTitle}>{props.title}</span>
				{props.priority == 1 ? <PinImage className={jotting.previewPin} /> : ""}
			</button>
		</data>
	);
}
