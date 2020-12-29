import shareMenu from "./shareMenu.module.css";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { shareNote, getNoteSharees } from "../../libs/Datastore/requests";
import ShareeList from "../ShareeList/shareeList";
import { useCancelableRequest } from "../../libs/Datastore/responseHelpers";

export default function ShareMenu() {
	const [noteSharees, setNoteSharees] = useState(null);
	const [recipientEmail, setRecipientEmail] = useState("");

	const ref = useRef(null);
	const router = useRouter();
	
	const abortController = new AbortController();
	
	const handleShareClick = (e) => {
		shareNote(router.query.id, recipientEmail, abortController)
		setRecipientEmail("");
		setNoteSharees([...noteSharees, {
			email: recipientEmail,
			user_id: 0
		}]);
	};
	
	const handleRecipientEmailChange = (e) => setRecipientEmail(e.target.value);
	
	useEffect(() => {
		ref.current.focus();
	}, []);
	
	useCancelableRequest(getNoteSharees, setNoteSharees, [router.query.id], []);
	
	return (
		<div className={shareMenu.shareMenu}>
			<h1>Share</h1>
			<ShareeList noteSharees={noteSharees} setNoteSharees={setNoteSharees} />
			<input
				type="text"
				ref={ref}
				value={recipientEmail}
				onChange={handleRecipientEmailChange}
				placeholder="Recipient's email"
				aria-placeholder="Recipient's email"
			/>
			<button onClick={handleShareClick}>Share</button>
		</div>
	);
}