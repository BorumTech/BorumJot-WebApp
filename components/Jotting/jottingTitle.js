import jottingStyleMod from "./jotting.module.css";
import { useState } from "react";

export default function JottingTitle(props) {
	const [title, setTitle] = useState(props.title);

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleTitleInputKeyDown = (e) => {
		if (e.key == "Enter") {
			updateTitle(note.id, e.target.value);
		}
	};

	return (
		<input
			type="text"
			className={jottingStyleMod.title}
			value={title}
			onChange={handleTitleChange}
			onKeyDown={handleTitleInputKeyDown}
		/>
	);
}
