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
}
