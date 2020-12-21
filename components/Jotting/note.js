import JottingDetails from "./jottingDetails";
import Jotting from "./Jotting";

export default function Note(note) {
	return (
		<Jotting jotType="note" {...note}>
			<JottingDetails jottingInfo={note} jotType="note" />
		</Jotting>
	);
}
