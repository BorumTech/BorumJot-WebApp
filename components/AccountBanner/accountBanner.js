import accountBanner from "./accountBanner.module.css";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CONTENT_STATE } from "../../libs/view";

export default function AccountBanner({ setFade }) {
	const [accountMenuClass, setAccountMenuClass] = useState("hidden");
	const [dropdownSrc, setDropdownSrc] = useState("down");

	const handleLogOut = () => {
		setFade(CONTENT_STATE.FADE_OUT);
		localStorage.clear();
	};

	const openAccountMenu = () => {
		setAccountMenuClass(
			accountMenuClass == "hidden" ? accountBanner.accountMenu : "hidden"
		);
		setDropdownSrc(dropdownSrc == "down" ? "up" : "down");
	};

	/**
	 * Gets the value of name from local storage OR 
	 * returns an empty string if the window hasn't loaded OR the value is not defined in localStorage
	 * @param {string} name The key to get from localStorage
	 * @returns {string} The value or an empty string
	 */
	// const getParamFromLocalStorage = name => {
	// 	// The window has loaded and the value is set in local storage
	// 	if (typeof window !== undefined && localStorage.getItem(name)) {
	// 		return window.localStorage.getItem(name);
	// 	}
		
	// 	// Return empty string by default
	// 	return "";
	// }

	const firstName = typeof window !== "undefined" && localStorage.getItem("firstName") ? localStorage.getItem("firstName") : "";
	const lastName = typeof window !== "undefined" && localStorage.getItem("lastName") ? localStorage.getItem("lastName") : "";

	return (
		<div className={accountBanner.accountBanner}>
			<button className={accountBanner.accountProfile} onClick={openAccountMenu}>
				<Image width={28} height={28} src="/images/profile.png" />
				<span>{`${firstName} ${lastName}`}</span>
				<div className={accountBanner.dropdownArrow}>
					<img
						width={16}
						height={16}
						src={`/images/arrow-${dropdownSrc}.png`}
					/>
				</div>
			</button>
			<ul className={accountMenuClass}>
				<li>
					<Link href="/Settings">
						<a className={accountBanner.settings}>Settings</a>
					</Link>
				</li>
				<li>
					<button className={accountBanner.logOut} onClick={handleLogOut}>
						Log Out
					</button>
				</li>
			</ul>
		</div>
	);
}