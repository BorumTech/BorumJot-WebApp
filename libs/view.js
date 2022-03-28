import { useState, useEffect } from "react";
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
		document.addEventListener("mouseup", handleClickOutside);

		// Unbind the event listener on clean up
		return () =>
			document.removeEventListener("mouseup", handleClickOutside);
	}, [ref]);
}

export function useEscapeAlerter(router) {
	useEffect(() => {
		const handleKeyUp = (e) => {
			if (router.query.id && e.key == "Escape") {
				Jotting.closeJotting(router);
			}
		};
	
		document.addEventListener("keyup", handleKeyUp);
	
		return () => document.removeEventListener("keyup", handleKeyUp);
	});

}

export function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState({
	  width: undefined,
	  height: undefined,
	});
  
	useEffect(() => {
	  // only execute all the code below in client side
	  if (typeof window !== 'undefined') {
		// Handler to call on window resize
		function handleResize() {
		  // Set window width/height to state
		  setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		  });
		}
	  
		// Add event listener
		window.addEventListener("resize", handleResize);
	   
		// Call handler right away so state gets updated with initial window size
		handleResize();
	  
		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	  }
	}, []); // Empty array ensures that effect is only run on mount
	return windowSize;
  }
