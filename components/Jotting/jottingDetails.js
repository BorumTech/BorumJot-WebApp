import jotting from "./jotting.module.css";
import FetchError from "../FetchError/fetchError";
import ProgressSpinner from "../ProgressSpinner/progressSpinner";
import { getBody, updateBody } from "../../libs/Datastore/requests";
import { useEffect, useState } from "react";
import {
	useCancelableRequest,
	catchRequestError,
} from "../../libs/Datastore/responseHelpers";

/**
 * The component for the body or details of a jotting
 * @param { {jotType: string, jottingInfo: any } } props The component props object
 * @param { {id: number, body?: string} } props.jottingInfo The object representation of the jotting
 * @param {string} props.jotType The type of the jotting
 */
export default function JottingDetails({ jottingInfo, jotType }) {
	const [body, setBody] = useState(jottingInfo.body ?? null);

	let bodyEl = <FetchError itemName={jotType} />;

	const handleBodyChange = (e) => {
		setBody(e.target.value);
	};

	// Request the body if not passed by parent component
	if (jottingInfo.body == null) {
		useCancelableRequest(
			getBody, // Request function
			setBody, // State dispatcher
			[jottingInfo.id, jotType], // Parameters of request function
			[jottingInfo.id] // Dependency list
		);
	}

	// Display body if the body was successfully received
	if (typeof body == "string") {
		bodyEl = (
			<textarea
				rows="10"
				cols="60"
				className={jotting.details}
				value={body}
				onChange={handleBodyChange}
			/>
		);
	}

	// Request every time the user changes something after a secondx
	useEffect(() => {
		const abortController = new AbortController();

		const scheduleUpdate = setTimeout(function () {
			if (body != null) {
				updateBody(
					jottingInfo.id,
					jotType,
					body,
					abortController
				).catch(catchRequestError);
			}
		}, 1000);

		return () => {
			abortController.abort();
			clearTimeout(scheduleUpdate);
		};
	}, [body]);

	return body != null ? bodyEl : <ProgressSpinner />;
}
