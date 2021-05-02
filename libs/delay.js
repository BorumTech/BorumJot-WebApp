import React, { useState, useEffect, useRef } from "react";

/**
 * @implNote Uses code by Dan Abramov
 * @link https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param {*} callback
 * @param {number} delay The amount of time the interval cycle lasts
 *                       before executing the callback again
 */
export function useInterval(callback, delay, callInitially = true) {
	const savedCallback = useRef();

	// Call function in beginning without waiting interval
	useEffect(() => {
		if (callInitially) callback();
	}, []);

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}
