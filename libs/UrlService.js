import NextRouter from "next/router";

export default class UrlService {
    /**
     * @param {NextRouter} router The router to manipulate the url
     */
	constructor(router) {
		this.router = router;
	}

	/**
	 * Changes the query in the url
	 * @param {object} newQuery The new query as an object
	 */
	changeQuery(newQuery, decoratedUrl = null) {
		// Get non-query string of url (first index of array)
        let url = this.router.asPath.split("?")[0] + "?";

		for (const param in newQuery) {
			url += `${param}=${newQuery[param]}`;
		}

		this.router.replace(url, decoratedUrl ?? url, { shallow: true });
		this.router.query = newQuery;
	}

	/**
	 * Gets the jotting info from the query
	 * @param {string} jotType The type of the jotting to check for in the url 
	 * @returns {RegExpExecArray} The info about the jotting in an array
	 * or null if the url does not match the regular expression 
	 */
	getQueryJottingInfo(jotType) {
		const urlRegEx = new RegExp(
			"/?" + jotType + "s/([0-9]+)/([A-Za-z -]+)"
		);
		const decodedUrl = decodeURIComponent(this.router.asPath);

		return urlRegEx.exec(decodedUrl);
	}

	/**
	 * Checks whether the url is formatted for displaying a single jotting
	 * @description Uses RegExp to find the component and sets the query if it matches
	 * @param {string} jotType The type of jotting to check for in the url (singular)
	 * @return {boolean} Whether the url matches a jotting to display
	 */
	queryHasJottingInfo(jotType) {
		return this.getQueryJottingInfo(jotType) != null;
	}

	/**
	 * Sets router query to jotting info
	 * @description Calls @see getQuery(jotType)
	 * @param {string} jotType 
	 * @throws {Error} an error if this.queryHasJottingInfo(jotType) returns false
	 */
	setQueryToJottingInfo(jotType) {
		const query = this.getQueryJottingInfo(jotType);
		
		if (!this.queryHasJottingInfo(jotType)) return;

		this.router.query = {
			type: jotType,
			id: parseInt(query[1]),
			title: query[2],
		};
	}
	
}
