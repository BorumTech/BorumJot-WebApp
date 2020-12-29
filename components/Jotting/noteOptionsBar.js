import JottingOptionsBar from "./JottingOptionsBar";
import Image from "next/image";

/**
 * The JottingOptionsBar plus specific Note options
 * @param {object} props Information about the note
 */
export default function NoteOptionsBar(props) {
    const handleShareClick = e => {
        const [showShareMenu, setShowShareMenu] = props.showShareMenuState;
        setShowShareMenu(!showShareMenu);
    };
    
    return (
        <JottingOptionsBar {...props}>
            <button onClick={handleShareClick}>
                <Image height={35} width={55} src="/images/share.png" alt="share icon" title="Share jotting" />
            </button>
        </JottingOptionsBar>
    );
}