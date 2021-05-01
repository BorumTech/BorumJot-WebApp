import JottingOptionsBar from "./JottingOptionsBar";
import Image from "next/image";
import ShareButton from "../ShareButton/shareButton";

/**
 * The JottingOptionsBar plus specific Note options
 * @param {object} props Information about the note
 */
export default function NoteOptionsBar(props) {
    return (
        <JottingOptionsBar jotType="note" {...props}>
            <ShareButton showShareMenuState={props.showShareMenuState} />
        </JottingOptionsBar>
    );
}