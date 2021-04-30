import { useRouter } from "next/router";
import { useRef } from "react";
import UrlService from "../../libs/UrlService";
import { useEscapeAlerter, useOutsideAlerter } from "../../libs/view";
import Task from "../Jotting/task";
import jottingsControl from "./jottingsControl.module.css";

export default function TaskControl({ tasks }) {
	const router = useRouter();
	const urlService = new UrlService(router);
	const ref = useRef(null);

	useOutsideAlerter(ref, router);

	// Escape the jot popup when Escape is pressed
	useEscapeAlerter(router);

	urlService.setQueryToJottingInfo("task");

	return tasks &&
		((router.query.type &&
			router.query.type == "task" &&
			router.query.id) ||
			urlService.queryHasJottingInfo("task")) ? (
		<article ref={ref} className={`${jottingsControl.fullJotting} ${jottingsControl.taskControl}`}>
			<Task {...tasks.find((item) => item.id == router.query.id)} />
		</article>
	) : (
		""
	);
}