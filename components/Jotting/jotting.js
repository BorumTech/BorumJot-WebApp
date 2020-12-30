import jotting from "./jotting.module.css";
import JottingTitle from "./jottingTitle";

export default function Jotting(props) {
	return (
		<div className={`${jotting.fullJotting} ${jotting[props.jotType]}`}>
			<JottingTitle
				id={props.id}
				originalTitle={props.title}
				jotType={props.jotType}
			/>
            {props.children}
		</div>
	);
}
