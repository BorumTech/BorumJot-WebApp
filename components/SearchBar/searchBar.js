import searchBar from "./searchBar.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import UrlService from "../../libs/UrlService";
import { useEscapeAlerter} from "../../libs/view";

export default function SearchBar() {
	const [active, setActive] = useState(false);

	const router = useRouter();
	const urlService = new UrlService(router);

	const handleSearch = e => {
		urlService.changeQuery({ q: e.target.value });
	};

	useEffect(() => {
		const handleKeyUp = (e) => {
			if (!router.query.id && e.key == "Escape") {
				setActive(false);
			}
		};

		document.addEventListener("keyup", handleKeyUp);
	
		return () => document.removeEventListener("keyup", handleKeyUp);		
	});

	/**
	 * Handles the click event on the search button
	 * @description Changes the url if the user has typed something in 
	 * @param {Event} e 
	 */
	const handleSearchBtnClick = e => {
		e.stopPropagation();
		const searchQuery = e.target.parentElement.nextElementSibling.value;
		if (searchQuery.length > 0 && active) urlService.changeQuery({q : searchQuery});
		else if (active) setActive(false);
		else setActive(true);
	};

	return (
		<div className={searchBar.container}>
			<button onClick={handleSearchBtnClick} className={searchBar.searchBarIcon}>
				<img
					className={searchBar.greyCircle}
					src="https://cdn.jsdelivr.net/gh/Borumer/Borum@v1.2.0/staticassets/images/search-bar-icon.png"
					id="search-bar-icon-img"
				/>
			</button>
			<input
				className={`${searchBar.searchBar} ${active ? searchBar.active : ''}`}
				type="text"
				onChange={handleSearch}
				placeholder="Search your Jottings"
			/>
		</div>
	);
}
