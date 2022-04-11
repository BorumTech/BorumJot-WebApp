import jotting from "./jotting.module.css";
import Jotting from "../../libs/Jotting";
import { useRouter } from "next/router";
import PinImage from "../pinImage";

export default function TaskPreview(props) {
	const router = useRouter();

	return (
		<data className={jotting.jotting} value={"T" + props.id}>
			<button className={jotting.previewButton} onClick={() => Jotting.openJotting(router, "task", props)}>
				<span className={`${jotting.previewTitle} ${props.completed == "1" ? jotting.completed : ''}`}>{props.title}</span>
				{props.priority == 1 ? <PinImage className={jotting.previewPin} /> : ""}
			</button>
		</data>
	);
}
