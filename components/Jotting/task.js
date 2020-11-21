import jotting from "./jotting.module.css";

export default function Task(props) {
    return (
        <data className={jotting.jotting} value={"task-"+props.id}>
            {props.title}
        </data>
    );
}