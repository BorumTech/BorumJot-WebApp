import jotting from "./jotting.module.css";
import FetchError from "../FetchError/fetchError";
import CircularProgress from "../CircularProgress/circularProgress";
import { unescapeSlashes } from "../../lib/requests";
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

/**
 * Makes GET request to API to get body of the note
 * @param {number} id The id of the note whose body is getting fetched
 * @return {Promise<string>} The body of the note
 */
async function getBody(id, jotType) {
	const queryString = `id=${id}`;
	let response = await fetch(
		`https://api.jot.bforborum.com/api/v1/${jotType}?${queryString}`,
		{
			headers: {
				authorization: "Basic " + localStorage.getItem("userApiKey"),
			},
			method: "GET",
		}
	);

	if (response.ok) {
		let { data } = await response.json();
		return unescapeSlashes(await data.body);
	}
}

/**
 * Updates the note's title to a new title
 * @param {number} noteId The id of the note whose title is getting updated
 * @param {string} newTitle The new title of the note
 */
async function updateTitle(noteId, newTitle) {
	const queryString = `id=${noteId}&name=${newTitle}`;
	let response = await fetch(
		"https://api.jot.bforborum.com/api/v1/note?" + queryString,
		{
			method: "PUT",
			headers: {
				authorization: "Basic " + localStorage.getItem("userApiKey"),
				"content-type": "application/x-www-form-urlencoded",
			},
		}
	);

	return response.ok;
}
