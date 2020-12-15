import jottingStyleMod from "./jotting.module.css";
import { useState } from "react";
import { updateJottingTitle } from "../../libs/Datastore/requests";

/**
 * @param { {id : number, originalTitle : string } } props
 * @param props.id The id of the jotting
 * @param props.originalTitle The title passed as a prop to this component
 */
export default function JottingTitle({ id, originalTitle, jotType }) {
	const [title, setTitle] = useState(originalTitle);

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	/**
	 * Updates the jotting's title to a new title
	 */
	const updateTitle = async () => {
		let response = await updateJottingTitle(id, jotType, title);

		return response.ok;
	};

	const handleTitleInputKeyDown = (e) => {
		if (e.key == "Enter") {
			updateTitle(id, e.target.value);
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
