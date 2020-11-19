export default function NoteList({ notes }) {
    return (
        <ul>
            {notes.map((item) => <li key={"note-"+item.id}>{item.title}</li>)}
        </ul>
    );
}