import jotting from "./jotting.module.css";

export default function Note(note) {
    return (
        <div className={jotting.fullJotting}>
            <p>{note.title}</p>
        </div>
    );
}