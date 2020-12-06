import jotting from "./jotting.module.css";
import JottingOptionsBar from "./JottingOptionsBar";
import { useEffect, useState } from "react";
import CircularProgress from "../CircularProgress/circularProgress";
import FetchError from "../FetchError/fetchError";
import { unescapeSlashes } from "../../lib/requests";

export default function Note(note) {
	const [body, setBody] = useState(null);
	const [title, setTitle] = useState(note.title);

	let bodyEl = <FetchError itemName="note" />;

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
		getBody(note.id).then((response) => setBody(response));
	}, []);

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleTitleInputKeyDown = e => {
		if (e.key == "Enter") {
			updateTitle(note.id, e.target.value);
		}
	};

	return (
		<div className={jotting.fullJotting}>
			<JottingOptionsBar {...note} jotType="note" />
			<input
				type="text"
				className={jotting.title}
				value={title}
				onChange={handleTitleChange}
				onKeyDown={handleTitleInputKeyDown}
			/>
			{body || body == "" ? bodyEl : <CircularProgress />}
		</div>
	);
}

/**
 * Makes GET request to API to get body of the note
 * @param {number} id The id of the note whose body is getting fetched
 * @return {Promise<string>} The body of the note
 */
async function getBody(id) {
	const queryString = `id=${id}`;
	let response = await fetch(
		`https://api.jot.bforborum.com/api/v1/note?${queryString}`,
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
