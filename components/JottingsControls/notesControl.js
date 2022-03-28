import ProgressSpinner from "../ProgressSpinner/progressSpinner";
import CreateNoteButton from "../CreateJottingButton/createNoteButton";
import NoteList from "../JottingList/noteList";
import jottingsControl from "./jottingsControl.module.css";

/**
 * Control for Notes heading,
 * list for view user notes, and
 * button to create note
 * @param { { notesState: [notes, setNotes] } } props
 * @param props.notesState The array returned from useState for the notes state
 * @param props.notesState[0] The value of notes
 * @param props.notesState[1] The Dispatch to set a new value to the notes state
 */
export default function NotesControl({notesState, active}) {
    const [notes, setNotes] = notesState;

	return (
		<article style={{display: active ? 'block' : 'none'}} className={jottingsControl.ownNoteList}>
			<h1>Notes</h1>
			{notes ? <NoteList notes={notes} /> : <ProgressSpinner />}
			<CreateNoteButton jots={notes} />
		</article>
	);
}