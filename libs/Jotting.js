export default class Jotting {
	static JOTTING_TYPES = {
		NOTE: "note",
		TASK: "task"
	};

	/**
	 * Replaces the url with the given jotting information
	 * @param {{asPath : string, replace}} router The router object gotten from useRouter
	 * @param {string} jotType The type of the jotting
	 * @param {{id, title}} props The id of the jotting for its jotting type
	 */
	static openJotting(router, jotType, { id, title }) {
		const [path] = router.asPath.split("?"); // Get non-query string of url (first index of array)
		
		const params = `?type=${jotType}&id=${id}&title=${title}`; // Store the query string
		
		const url = path + params,
			decoratedUrl = `/?${jotType}s/${id}/${title ?? ""}`,
			options = { shallow: true };

		router.replace(url, decoratedUrl, options);
	}

	/**
	 * Closes the jotting by removing it from the url
	 * @param {{asPath : string, replace}} router 
	 */
	static closeJotting(router) {
		router.replace(router.asPath, router.asPath.split("?")[0]);
	}
}
