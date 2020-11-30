import jotting from "./jotting.module.css";

export default function JottingOptionsBar(props) {
    return (
        <div className={jotting.jottingsOptionsBar}>
            <button>Delete</button>
            <button>Pin</button>
            <button>Rename</button>
        </div>
    );
}