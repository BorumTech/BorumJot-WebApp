import Browser from "../../libs/browser";
import { useState, useEffect } from "react";
import browserCompatibilityInfo from "./browserCompatibilityInfo.module.css";

export default function BrowserCompatibilityInfo(props) {
	const [browserInfo, setBrowserInfo] = useState(null);

	useEffect(() => {
		setBrowserInfo(new Browser(window));
	}, []);

	if (browserInfo && !browserInfo.browserSupported())
		return (
			<p className={browserCompatibilityInfo.browserMessage}>
				Borum Jot is not fully supported on {browserInfo.browser}
			</p>
		);
    else 
    	return null;
}
