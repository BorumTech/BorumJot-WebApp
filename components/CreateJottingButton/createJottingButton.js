import createJottingBtn from "./createJottingBtn.module.css";
import { useState, useRef } from "react";
import { createJotting as createJot } from "../../libs/Datastore/requests";

export default function CreateJottingButton({ jotType, jots, setJots }) {
	const [newJotInputCls, setNewJotInputCls] = useState("invisible");
	const [createJotBtnCls, setCreateJotBtnCls] = useState(
		createJottingBtn.createJottingBtn
	);
	const [newJotInputText, setNewJotInputText] = useState("");

	const nameInput = useRef(null);

	const showInput = () => {
		setNewJotInputCls(createJottingBtn.newJottingName);
		setCreateJotBtnCls("invisible");
		setTimeout(() => {
			nameInput.current.focus();
		}, 100);
	};

	const showBtn = () => {
		setNewJotInputCls("invisible");
		setCreateJotBtnCls(createJottingBtn.createJottingBtn);
	};

	const toggleJotEl = () => {
		if (newJotInputCls != createJottingBtn.newJottingName) showInput();
		else showBtn();
	};

	/**
	 * When jot is clicked,
	 * if the jot input isn't visible, make it visible and focus it
	 * set a timeout of 100 miliseconds before focusing so the focusing works
	 * (the class that made it display:none was intefering with this).
	 */
	const handleNewJotBtnClick = (e) => {
		toggleJotEl();
	};

	const handleNewJotInputKeyUp = async (e) => {
		const clearInput = () => setNewJotInputText("");

		if (e.key == "Enter") {
			const jotName = e.target.value;
			const response = await createJot(jotType, jotName);
			clearInput();
			setJots([...jots, response]);
			showBtn();
		} else if (e.key == "Escape") {
			clearInput();
			toggleJotEl();
		}
	};

	const handleNewJotInputChange = (e) => {
		setNewJotInputText(e.target.value);
	};

	return (
		<div>
			<div>
				<input
					ref={nameInput}
					className={newJotInputCls}
					type="text"
					placeholder={`New ${jotType} Name`}
					onKeyUp={handleNewJotInputKeyUp}
					value={newJotInputText}
					onChange={handleNewJotInputChange}
				/>
			</div>
			<button className={createJotBtnCls} onClick={handleNewJotBtnClick}>
				Add {jotType}
			</button>
		</div>
	);
}
