import shareMenu from "./shareMenu.module.css";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { shareNote, getNoteSharees } from "../../libs/Datastore/requests";
import ShareeList from "../ShareeList/shareeList";
import { useCancelableRequest } from "../../libs/Datastore/responseHelpers";

export default function ShareMenu(props) {
	const [noteSharees, setNoteSharees] = useState(null);
	const [recipientEmail, setRecipientEmail] = useState("");

	const ref = useRef(null);
	const router = useRouter();

	const abortController = new AbortController();

	const handleShareClick = (e) => {
		setRecipientEmail("");
		shareNote(router.query.id, recipientEmail, abortController)
			.then((response) =>
				setNoteSharees([
					...noteSharees,
					{
						email: recipientEmail,
						user_id: response.data.recipient_id,
					},
				])
			)
			.catch(alert);
	};

	const handleRecipientEmailChange = (e) => setRecipientEmail(e.target.value);

	const handleExitClick = (e) => {
		if (props.setShowShareMenu) {
			props.setShowShareMenu(false);
		}
	};

	useEffect(() => {
		ref.current.focus();
	}, []);

	useCancelableRequest(getNoteSharees, setNoteSharees, [router.query.id], []);

	return (
		<div className={shareMenu.shareMenu}>
			<h1>Share</h1>
			<button className={shareMenu.exit} onClick={handleExitClick}>
				X
			</button>
			<ShareeList
				noteSharees={noteSharees}
				setNoteSharees={setNoteSharees}
			/>
			<input
				type="text"
				ref={ref}
				value={recipientEmail}
				onChange={handleRecipientEmailChange}
				placeholder="Recipient's email"
				aria-placeholder="Recipient's email"
			/>
			<button
				className={shareMenu.shareButton}
				onClick={handleShareClick}
			>
				Share
			</button>
		</div>
	);
}
