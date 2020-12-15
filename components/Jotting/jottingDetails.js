import jotting from "./jotting.module.css";
import FetchError from "../FetchError/fetchError";
import CircularProgress from "../CircularProgress/circularProgress";
import { getBody } from "../../libs/Datastore/requests";
import { useEffect, useState } from "react";

/**
 * The component for the body or details of a jotting
 * @param { {jotType: string, jottingInfo: any } } props The component props object
 * @param { {id: number} } props.jottingInfo The object representation of the jotting
 * @param {string} props.jotType The type of the jotting
 */
export default function JottingDetails({jottingInfo, jotType}) {
    const [body, setBody] = useState(null);

    let bodyEl = <FetchError itemName={jotType} />;
    
    const handleBodyUpdate = (e) => {
		setBody(e.target.value);
	};
    
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

    useEffect(() => {
		getBody(jottingInfo.id, jotType).then((response) => setBody(response));
	}, []);
    
	return body || body == "" ? bodyEl : <CircularProgress />;
}
