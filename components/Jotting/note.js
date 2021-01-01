import JottingDetails from "./jottingDetails";
import Jotting from "./jotting";
import NoteOptionsBar from "./noteOptionsBar";

export default function Note(props) {
	return (
		<Jotting jotType="note" {...props.note}>
			<NoteOptionsBar {...props.note} showShareMenuState={props.showShareMenuState} />
			<JottingDetails jottingInfo={props.note} jotType="note" />
		</Jotting>
	);
}
