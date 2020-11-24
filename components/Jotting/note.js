import jotting from "./jotting.module.css";

export default function Note(props) {
    return (
        <data className={jotting.jotting} value={"note-"+props.id}>
            {props.title}
        </data>
    );
}