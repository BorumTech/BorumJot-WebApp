import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCookies } from "react-cookie";
import accountBanner from "./accountBanner.module.css";

export default function AccountBanner() {
	const [accountMenuClass, setAccountMenuClass] = useState(accountBanner.inactive);
	const [dropdownSrc, setDropdownSrc] = useState("down");
	const [cookies, setCookie, removeCookie] = useCookies(["id", "email", "apiKey"]);

	const handleLogOut = () => {
		window.location.href = "https://accounts.borumtech.com/logout"
	};

	const openAccountMenu = () => {
		setAccountMenuClass(
			accountMenuClass == accountBanner.inactive ? accountBanner.accountMenu : accountBanner.inactive
		);
		setDropdownSrc(dropdownSrc == "down" ? "up" : "down");
	};

	/**
	 * Gets the value of name from local storage OR 
	 * returns an empty string if the window hasn't loaded OR the value is not defined in localStorage
	 * @param {string} name The key to get from localStorage
	 * @returns {string} The value or an empty string
	 */
	const getParamFromLocalStorage = name => {
		if (typeof window !== "undefined" && cookies[name])
			return cookies[name]
		else
			return "";
	}

	const firstName = getParamFromLocalStorage("firstName");
	const lastName = getParamFromLocalStorage("lastName");

	return (
		<div className={accountBanner.accountBanner}>
			<button className={accountBanner.accountProfile} onClick={openAccountMenu}>
				<Image width={28} height={28} src="/images/profile.png" />
				<span className={accountBanner.fullName}>{`${firstName} ${lastName}`}</span>
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