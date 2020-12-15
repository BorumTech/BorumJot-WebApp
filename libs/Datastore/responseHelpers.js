/**
 * Unescapes the slashes
 * @param {string} str
 * @return The string with all the slashes unescaped 
 */
export function unescapeSlashes(str) {
    // Adds another escaped slash if the string ends with an odd number of escaped slashes 
    // because an odd number crashes the JSON.parse
	let parsedStr = str.replace(/(^|[^\\])(\\\\)*\\$/, "$&\\");

	try {
		parsedStr = JSON.parse(`"${parsedStr}"`);
	} catch (e) {
		return str;
    }
    
	return parsedStr;
}