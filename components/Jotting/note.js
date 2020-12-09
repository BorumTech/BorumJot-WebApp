import jotting from "./jotting.module.css";
import JottingOptionsBar from "./JottingOptionsBar";
import JottingTitle from "./jottingTitle";
import JottingDetails from "./jottingDetails";

export default function Note(note) {
	return (
		<div className={jotting.fullJotting}>
			<JottingOptionsBar {...note} jotType="note" />
			<JottingTitle title={note.title} />
			<JottingDetails jottingInfo={note} jotType="note" />
		</div>
	);
}
