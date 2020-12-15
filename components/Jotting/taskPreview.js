import jotting from "./jotting.module.css";
import Jotting from "../../libs/Jotting";
import { useRouter } from "next/router";

export default function TaskPreview(props) {
	const router = useRouter();

	return (
		<data className={jotting.jotting} value={"T" + props.id}>
			<button onClick={(e) => Jotting.openJotting(router, "task", props)}>
				{props.title}
			</button>
		</data>
	);
}
