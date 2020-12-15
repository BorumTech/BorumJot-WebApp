import jotting from "./jotting.module.css";
import Jotting from "../../libs/Jotting";
import { useRouter } from "next/router";

export default function NotePreview(props) {
	const router = useRouter();
	
	return (
		<data className={jotting.jotting} value={"N" + props.id}>
			<button onClick={(e) => Jotting.openJotting(router, "note", props)}>
				{props.title}
			</button>
		</data>
	);
}
