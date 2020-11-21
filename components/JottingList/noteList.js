import Note from "../Jotting/note";

export default function NoteList({ notes }) {
    return (
        <ul>
            {notes.map((item) => <li key={item.id}><Note {...item} /></li>)}
        </ul>
    );
}