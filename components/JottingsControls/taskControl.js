import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import UrlService from "../../libs/UrlService";
import { useEscapeAlerter, useOutsideAlerter } from "../../libs/view";
import Subtask from "../Jotting/subtask";
import Task from "../Jotting/task";
import ShareMenu from "../ShareMenu/shareMenu";
import jottingsControl from "./jottingsControl.module.css";

export default function TaskControl({ tasks }) {
	const router = useRouter();
	const urlService = new UrlService(router);
	const ref = useRef(null);
	const [showShareMenu, setShowShareMenu] = useState(false);
	const [urlInfo, setUrlInfo] = useState(urlService.getQueryJottingInfo("task") || null);

	useEffect(() => {
		setUrlInfo(urlService.getQueryJottingInfo("task"));
	}, [router.asPath]);

	useOutsideAlerter(ref, router);

	// Escape the jot popup when Escape is pressed
	useEscapeAlerter(router);

	// Load notes and tasks before proceeding with showing any task or subtask
	return tasks && urlInfo != null ? (
		<article
			ref={ref}
			className={`${jottingsControl.fullJotting} ${jottingsControl.taskControl}`}
		>
			{console.log("Searching for task with given id...", urlInfo[1])}
			<div
				ref={showShareMenu ? null : ref}
				className={jottingsControl.jottingContent}
			>
				{
					tasks.find(item => item.id == urlInfo[1]) ? 
					<Task
						showShareMenuState={[showShareMenu, setShowShareMenu]}
						{...tasks.find((item) => item.id == urlInfo[1])}
					/> : 
					<Subtask 
						showShareMenuState={[showShareMenu, setShowShareMenu]} 
						id={urlInfo[1]} 
					/>
				}
			</div>

			{showShareMenu && router.query.type == "task" ? (
				<ShareMenu jotType="task" setShowShareMenu={setShowShareMenu} />
			) : (
				""
			)}
		</article>
	) : (
		""
	);
}
