import BorumJotRequest from "./BorumJotRequest";
import { unescapeSlashes } from "./responseHelpers";

class Datastore {
	constructor(abortController) {
		this.abortController = abortController;
	}
}

export async function submitLogin(email, password) {
	return await BorumJotRequest.initialize(`login`)
		.post(`email=${email}&password=${password}`)
		.makeRequest();
}

/**
 * Makes GET request
 */
export async function getJottings() {
	if (window) {
		let { data } = await BorumJotRequest.initialize("jottings")
			.authorize()
			.makeRequest();

		const tasks = data.filter(item => item.source == "task");
		tasks.forEach(item => item.body = unescapeSlashes(item.body));

		return {
			notes: data.filter((item) => item.source == "note"),
			tasks,
		};
	}

	throw new Error("Window not loaded yet");
}

/**
 * Makes GET request to API to get body of the note
 * @param {number} id The id of the note whose body is getting fetched
 * @return {Promise<string>} The body of the note
 */
export async function getBody(id, jotType, abortController) {
	const queryString = `id=${id}`;
	let response = await BorumJotRequest.initialize(`${jotType}?${queryString}`)
		.authorize()
		.makeRequest(abortController);
	
	return unescapeSlashes(await response.data.body);
}

export async function updateBody(id, jotType, newBody, abortController) {
	const queryString = `id=${id}`;
	const unescapedBody = newBody ? unescapeSlashes(newBody) : "";

	return BorumJotRequest.initialize(`${jotType}?${queryString}`)
		.authorize()
		.put(`body=${unescapedBody}`)
		.makeRequest(abortController);
}

/**
 * Makes API request to pin a jotting of the given type with the given id
 * @param {object} jottingInfo The jotting info
 * @param {number} jottingInfo.id The id of the jotting
 * @param {string} jottingInfo.jotType The type of the jotting
 * @param {number} jottingInfo.priority The requested new priority of the jotting
 */
export async function pinJotting({ id, jotType, priority }) {
	const queryString = `id=${id}&priority=${priority == 0 ? 1 : 0}`;
	return BorumJotRequest.initialize(`${jotType}?${queryString}`)
		.authorize()
		.put()
		.makeRequest();
}

/**
 * Makes DELETE request to endpoint jotType (dynamic)
 * @precondition jotType is an existing endpoint; userApiKey exists in localStorage
 * @postcondition Request is made and response is returned
 * @param {object} jottingInfo The jotting info
 * @param {number} jottingInfo.id The id of the jotting
 * @param {string} jottingInfo.jotType The type of the jotting
 */
export async function deleteJotting({ id, jotType }) {
	return BorumJotRequest.initialize(`${jotType}`)
		.authorize()
		.delete(`id=${id}`)
		.makeRequest();
}

/**
 * Updates the title of a jotting
 * @param {number} id The id of the jotting
 * @param {string} jotType The type of the jotting
 * @param {string} title The title of the updated jotting
 */
export async function updateJottingTitle(id, jotType, title) {
	const queryString = `id=${id}&name=${title}`;
	return BorumJotRequest.initialize(`${jotType}?${queryString}`)
		.authorize()
		.put()
		.makeRequest();
}

/**
 * Makes POST request to create a new jotting
 * @param {string} jotType
 * @param {string} jotName
 */
export async function createJotting(jotType, jotName) {
	const queryString = `${jotType.toLowerCase()}`;
	const { data } = await BorumJotRequest.initialize(queryString)
		.authorize()
		.post(`name=${jotName}`)
		.makeRequest();

	return {
		id: data.id,
		title: jotName,
	};
}

export async function getSubtasks(id) {
	const queryString = `id=${id}`;
	const { data } = await BorumJotRequest.initialize(`subtasks?${queryString}`)
		.authorize()
		.makeRequest();

	return data;
}
