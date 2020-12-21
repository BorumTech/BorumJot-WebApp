import { useEffect } from "react";
import Jotting from "./Jotting";

/**
 * Enum for describing the state of the content's view
 */
export const CONTENT_STATE = {
	VISIBLE: "visible",
	FADE_IN: "fadeIn",
	FADE_OUT: "fadeOut",
	INVISIBLE: "invisible",
};

Object.freeze(CONTENT_STATE);

/**
 * Hook that clears url if user clicks outside of the component
 * @borrows {@link https://stackoverflow.com/a/42234988/9860982}
 * @param ref The React ref object returned from useRef()
 * @license CC BY-SA 4.0 (https://creativecommons.org/licenses/by-sa/4.0/)
 * @author Ben Bud
 */
export function useOutsideAlerter(ref, router) {
	useEffect(() => {
		const handleClickOutside = (e) => {
			if (ref.current && !ref.current.contains(e.target)) {
        Jotting.closeJotting(router);
			}
		};

		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside);

		// Unbind the event listener on clean up
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [ref]);
}
