import Note from "../Jotting/note";
import jottingList from "./jottingList.module.css";

export default function NoteList({ notes }) {
    return (
        <ul className={jottingList.jottingList}>
            {notes.map((item) => <li key={item.id}><Note {...item} /></li>)}
        </ul>
    );
}