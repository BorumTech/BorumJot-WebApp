import Note from "../Jotting/note";
import ShareMenu from "../ShareMenu/shareMenu";
import { useRef, useState, useEffect } from "react";
import jottingsControl from "./jottingsControl.module.css";
import { useRouter } from "next/router";
import { useOutsideAlerter, useEscapeAlerter } from "../../libs/view";
import UrlService from "../../libs/UrlService";

export default function NoteControl({ notes }) {
	const router = useRouter();
	const [showShareMenu, setShowShareMenu] = useState(false);

	const ref = useRef(null);

	// Escape the jot popup when Escape is pressed or the user clicks outside this component
	useOutsideAlerter(ref, router);
	useEscapeAlerter(router);

	const urlService = new UrlService(router);
	const showNote =
		notes &&
		((router.query.type &&
			router.query.type == "note" &&
			router.query.id) ||
			urlService.queryHasJottingInfo("note"));

	useEffect(() => {
		urlService.setQueryToJottingInfo("note");
	}, [notes]);

	if (showNote && router.query.type == "note") {
		return (
			<article ref={showShareMenu ? ref : null} className={jottingsControl.noteControl}>
				<div
					ref={showShareMenu ? null : ref}
					className={jottingsControl.jottingContent}
				>
					<Note
						note={router.query}
						showShareMenuState={[showShareMenu, setShowShareMenu]}
					/>
				</div>

				{showShareMenu && router.query.type == "note" ? (
					<ShareMenu setShowShareMenu={setShowShareMenu} />
				) : (
					""
				)}
			</article>
		);
	}

	return null;
}