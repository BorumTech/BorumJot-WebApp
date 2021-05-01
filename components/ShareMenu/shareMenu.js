import shareMenu from "./shareMenu.module.css";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { shareJot, getJotSharees } from "../../libs/Datastore/requests";
import ShareeList from "../ShareeList/shareeList";
import { useCancelableRequest } from "../../libs/Datastore/responseHelpers";

export default function ShareMenu(props) {
	const [jotSharees, setJotSharees] = useState(null);
	const [recipientEmail, setRecipientEmail] = useState("");

	const ref = useRef(null);
	const router = useRouter();

	const abortController = new AbortController();

	const handleShareClick = (e) => {
		setRecipientEmail("");
		shareJot(
			router.query.id,
			recipientEmail,
			props.jotType,
			abortController
		)
			.then((response) =>
				setJotSharees([
					...jotSharees,
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

	useCancelableRequest(
		getJotSharees,
		setJotSharees,
		[router.query.id, props.jotType, abortController],
		[]
	);

	return (
		<div className={shareMenu.shareMenu}>
			<h1>Share</h1>
			<button className={shareMenu.exit} onClick={handleExitClick}>
				X
			</button>
			<ShareeList
				noteSharees={jotSharees}
				setNoteSharees={setJotSharees}
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
