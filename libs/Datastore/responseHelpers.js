import { useEffect } from "react";

/**
 * Unescapes the slashes
 * @param {string} str
 * @return The string with all the slashes unescaped
 */
export function unescapeSlashes(str) {
	// Adds another escaped slash if the string ends with an odd number of escaped slashes
	// because an odd number crashes the JSON.parse
	let parsedStr = str.replace(/\\'/gm, `'`);
	parsedStr = parsedStr.replace(/\\n/gm, `\n`);

	return parsedStr;
}

/**
 * Custom hook for firing request that cancel when a component unmounts
 * Precondition: requestFunc has abortController as last parameter
 * @param requestFunc The function from the Datastore to call
 * @param dispatcher The state dispatcher to call when the requestFunc promise has returned a response
 * @param {any[]} props The list of props
 * @param {any[]} dependencyList The list of dependencies for when to fire this as componentDidUpdate()
 */
export function useCancelableRequest(
	requestFunc,
	dispatcher,
	props,
	dependencyList = []
) {
	// componentDidMount(), componentDidUpdate(), componentWillUmmount()
	useEffect(() => {
		const abortController = new AbortController();

		requestFunc(...props, abortController)
			.then(dispatcher)
			.catch((err) => {
				catchRequestError(err);
				dispatcher(-1);
			});

		return () => abortController.abort();
	}, dependencyList);
}

/**
 * Handles the catch of a fetch promise
 * @description This function logs a custom message if the error is an AbortError (thrown manually)
 * and the actual error message for anything else
 * @param {Error} err The error object
 */
export function catchRequestError(err) {
	if (err.name == "AbortError") console.log("Request automatically canceled");
	else console.error(err.message);
}

