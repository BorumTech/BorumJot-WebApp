import { useRouter } from "next/router";
import { useRef, useState } from "react";
import UrlService from "../../libs/UrlService";
import { useEscapeAlerter, useOutsideAlerter } from "../../libs/view";
import Task from "../Jotting/task";
import ShareMenu from "../ShareMenu/shareMenu";
import jottingsControl from "./jottingsControl.module.css";

export default function TaskControl({ tasks }) {
	const router = useRouter();
	const urlService = new UrlService(router);
	const ref = useRef(null);
	const [showShareMenu, setShowShareMenu] = useState(false);

	useOutsideAlerter(ref, router);

	// Escape the jot popup when Escape is pressed
	useEscapeAlerter(router);

	urlService.setQueryToJottingInfo("task");

	return tasks &&
		((router.query.type &&
			router.query.type == "task" &&
			router.query.id) ||
			urlService.queryHasJottingInfo("task")) ? (
		<article
			ref={ref}
			className={`${jottingsControl.fullJotting} ${jottingsControl.taskControl}`}
		>
			<div
				ref={showShareMenu ? null : ref}
				className={jottingsControl.jottingContent}
			>
				<Task
					showShareMenuState={[showShareMenu, setShowShareMenu]}
					{...tasks.find((item) => item.id == router.query.id)}
				/>
			</div>

			{showShareMenu && router.query.type == "task" ? (
				<ShareMenu setShowShareMenu={setShowShareMenu} />
			) : (
				""
			)}
		</article>
	) : (
		""
	);
}
