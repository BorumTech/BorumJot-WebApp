import jotting from "./jotting.module.css";
import { openJotting } from "../../lib/Jotting";
import { useRouter } from "next/router";

export default function TaskPreview(props) {
	const router = useRouter();

	return (
		<data className={jotting.jotting} value={"T" + props.id}>
			<button onClick={(e) => openJotting(router, "task", props)}>
				{props.title}
			</button>
		</data>
	);
}
