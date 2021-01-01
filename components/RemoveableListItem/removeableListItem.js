import removeableListItem from "./removeableListItem.module.css";

/**
 * A list item that has a remove button
 * @param {object} props
 * @param {string} props.itemType The type of item in TITLE case
 * @param {(e) => void} props.handleRemoveClick The event handler that fires when the remove button is clicked
 */
export default function RemoveableListItem({
	handleRemoveClick,
	content,
	removeText = "Remove",
	id,
	children
}) {
	return (
		<li id={id} className={removeableListItem.item}>
			{children}
			<span>{content}</span>
			<button
				onClick={handleRemoveClick}
				className={removeableListItem.removeItemButton}
			>
				{removeText}
			</button>
		</li>
	);
}
