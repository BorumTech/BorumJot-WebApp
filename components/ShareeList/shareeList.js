import { useRouter } from "next/router";
import { removeSharee } from "../../libs/Datastore/requests";
import ProgressSpinner from "../CircularProgress/circularProgress";
import FetchError from "../FetchError/fetchError";
import shareeList from "./shareeList.module.css";
import RemoveableListItem from "../RemoveableListItem/removeableListItem";

/**
 *
 * @param { {noteSharees : object[], setNoteSharees : any }} props
 * @param {object[]} props.noteSharees
 */
export default function ShareeList({ noteSharees, setNoteSharees }) {
	const removeShareeById = (id) => {
		for (let i = 0; i < noteSharees.length; i++) {
			if (noteSharees[i].user_id == id) {
				noteSharees.splice(i, 1); // Remove the sharee element
				setNoteSharees(null); // Needed in order for next update to work
				setNoteSharees(noteSharees); // Update component to reflect removed element
				return;
			}
		}
	};

	if (noteSharees instanceof Array) {
		return (
			<ul className={shareeList.shareeList}>
				{noteSharees.map((item) => (
					<ShareeListItem
						removeShareeById={removeShareeById}
						key={item.user_id}
						{...item}
					/>
				))}
			</ul>
		);
	} else if (noteSharees == null)
		return (
			<div className={shareeList.nonList}>
				<ProgressSpinner />
			</div>
		);
	else
		return (
			<div className={shareeList.nonList}>
				<FetchError itemName="sharees" />
			</div>
		);
}

function ShareeListItem({ user_id, email, removeShareeById }) {
	const router = useRouter();
	const abortController = new AbortController();

	const handleRemoveClick = (e) => {
		removeSharee(router.query.id, email, abortController).then(() =>
			removeShareeById(user_id)
		);
	};

	return <RemoveableListItem handleRemoveClick={handleRemoveClick} content={email} />
}
