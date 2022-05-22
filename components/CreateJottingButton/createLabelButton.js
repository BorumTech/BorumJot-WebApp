import createJottingBtn from "./createJottingBtn.module.css";
import { useState, useRef } from "react";
import { createLabel } from "../../libs/Datastore/requests";

/**
 * 
 * @param {object} props
 * @param {object[]} props.jots 
 */
export default function CreateLabelButton({
	setJots
}) {
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
			try {
				const newJotResponseData = await createLabel(jotName);
				setJots((prevJots, props) => {
					console.info("New Jots State", [...prevJots, newJotResponseData]);
					return [...prevJots, newJotResponseData];
				});
			} catch (e) {
				console.error(e);
				window.alert("A system error occurred");
			} finally {
				clearInput();
				showBtn();
				
			}
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
					placeholder={`New Label Name`}
					onKeyUp={handleNewJotInputKeyUp}
					value={newJotInputText}
					onChange={handleNewJotInputChange}
				/>
			</div>
			<button className={createJotBtnCls} onClick={handleNewJotBtnClick}>
				Add Label
			</button>
		</div>
	);
}
