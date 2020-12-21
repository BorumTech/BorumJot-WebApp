import jotting from "./jotting.module.css";
import JottingOptionsBar from "./JottingOptionsBar";
import JottingTitle from "./jottingTitle";
import JottingDetails from "./jottingDetails";

export default function Note(note) {
	return (
		<div className={jotting.fullJotting}>
			<JottingOptionsBar {...note} jotType="note" />
			<JottingTitle id={note.id} originalTitle={note.title} jotType="note" />
			<JottingDetails jottingInfo={note} jotType="note" />
		</div>
	);
}
