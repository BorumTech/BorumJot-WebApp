import jotting from "./jotting.module.css";
import JottingOptionsBar from "./JottingOptionsBar";
import JottingTitle from "./jottingTitle";
import { useRef } from "react";
import { useOutsideAlerter } from "../../libs/view";
import { useRouter } from "next/router";

export default function Jotting(props) {
	const ref = useRef(null);
	const router = useRouter();

	useOutsideAlerter(ref, router);

	return (
		<div ref={ref} className={jotting.fullJotting}>
			<JottingOptionsBar {...props} />
			<JottingTitle
				id={props.id}
				originalTitle={props.title}
				jotType={props.jotType}
			/>
            {props.children}
		</div>
	);
}
