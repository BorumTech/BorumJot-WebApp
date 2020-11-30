/**
 * Event handler to view a task or note
 * @param {{asPath : string, replace}} router The router object gotten from useRouter
 * @param {string} jotType The type of the jotting
 * @param {{id, title}} props The id of the jotting for its jotting type
 */
function openJotting(router, jotType, { id, title }) {
	const [path] = router.asPath.split("?"),
		params = `?type=${jotType}&id=${id}&title=${title}`;

	const url = path + params,
		decoratedUrl = `/?${jotType}s/${id}/${title ?? ""}`,
		options = { shallow: true };

	router.replace(url, decoratedUrl, options);
}

export { openJotting };
