import jotting from "./jotting.module.css";
import FetchError from "../FetchError/fetchError";
import CircularProgress from "../CircularProgress/circularProgress";
import { getBody } from "../../libs/Datastore/requests";
import { useEffect, useState } from "react";

/**
 * The component for the body or details of a jotting
 * @param { {jotType: string, jottingInfo: any } } props The component props object
 * @param { {id: number, body?: string} } props.jottingInfo The object representation of the jotting
 * @param {string} props.jotType The type of the jotting
 */
export default function JottingDetails({ jottingInfo, jotType }) {
	const [body, setBody] = useState(null);

	let bodyEl = <FetchError itemName={jotType} />;

	const handleBodyUpdate = (e) => {
		setBody(e.target.value);
	};

	// componentDidMount(), componentDidUpdate() - getBody
	useEffect(() => {
		if (jottingInfo.body != null) {
			setBody(jottingInfo.body);
		} else {
			getBody(jottingInfo.id, jotType).then((response) => setBody(response));
		}
	}, [jottingInfo.id]);

	if (typeof body == "string") {
		bodyEl = (
			<textarea
				rows="10"
				cols="60"
				className={jotting.details}
				value={body}
				onChange={handleBodyUpdate}
			/>
		);
	}

	return body != null ? bodyEl : <CircularProgress />;
}
