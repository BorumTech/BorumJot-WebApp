import styledCheckbox from "./styledCheckbox.module.css";
import { useEffect, useRef, useState } from "react";
import { updateTaskStatus } from "../../libs/Datastore/requests";

/**
 * @param {object} props
 * @param {number} props.id
 * @param {string} props.prefix
 * @param {boolean} props.completed
 */
export default function StyledCheckbox({ id, prefix, completed }) {
	const [checked, setChecked] = useState(completed);
	const ref = useRef(null);

	/**
	 * Event handler for when the checkbox is checked or unchecked
	 * @description Uses whether the label's background position contains a negative sign
	 * to determine whether the checkbox is currently checked
	 * Instantaneously updates UI but undoes checkbox and alerts if there is a fetch error,
	 * using Promise.race()
	 * @param {Event} e
	 */
	const handleCheckboxChange = (e) => {
		const newCheckboxValue = !checked;
		Promise.race([
			updateTaskStatus(id, newCheckboxValue).catch((err) => {
				setChecked(!newCheckboxValue);
				alert(err);
			}),
			setChecked(newCheckboxValue),
		]);
	};

	useEffect(() => {
		ref.current.style.backgroundPosition = checked
			? "0px -20px"
			: "0px 0px";
	}, [checked]);

	return (
		<React.Fragment>
			<input
				id={`${prefix}${id}`}
				className={styledCheckbox.taskCompletionCheckbox}
				type="checkbox"
				checked={checked}
				onChange={handleCheckboxChange}
			/>
			<label
				ref={ref}
				htmlFor={`${prefix}${id}`}
				className={styledCheckbox.taskCompletionCheckbox}
				title="Mark as complete"
			></label>
		</React.Fragment>
	);
}
