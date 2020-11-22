import home from "./home.module.css";
import LogoImage from "../../components/logoImage";
import SearchBar from "../../components/SearchBar/searchBar";
import NoteList from "../../components/JottingList/noteList";
import TaskList from "../../components/JottingList/taskList";
import { useState, useEffect } from "react";
import ProgressSpinner from "../../components/CircularProgress/circularProgress";
import { CONTENT_STATE } from "../../lib/view";
import Image from "next/image";
import Link from "next/link";

export default function Home({ fade, onFadeInLogin, setFade }) {
	const [notes, setNotes] = useState(null);
	const [tasks, setTasks] = useState(null);

	useEffect(() => {
		getJottings().then((response) => {
			setNotes(response.notes);
			setTasks(response.tasks);
		});
	}, []);

	const transitionToLogin = () => {
		onFadeInLogin();
		setFade(CONTENT_STATE.INVISIBLE);
	};

	const handleOnAnimationEnd = (e) => {
		if (fade == CONTENT_STATE.FADE_OUT) {
			transitionToLogin();
		} else if (fade == CONTENT_STATE.FADE_IN) {
			setFade(CONTENT_STATE.VISIBLE);
		}
	};

	return (
		<main
			onAnimationEnd={handleOnAnimationEnd}
			className={
				fade == CONTENT_STATE.INVISIBLE ? fade : `${fade} ${home.main}`
			}
		>
			<BrandHeader />
			<SearchBar />
			<div className={home.ownNoteList}>
				{notes ? <NoteList notes={notes} /> : <ProgressSpinner />}
			</div>
			<div className={home.ownTaskList}>
				{tasks ? <TaskList tasks={tasks} /> : <ProgressSpinner />}
			</div>
			<AccountBanner setFade={setFade} />
		</main>
	);
}

function BrandHeader() {
	return (
		<div className="brandNameContainer">
			<a href="/">
				<LogoImage />
				<span>Borum Jot</span>
			</a>
		</div>
	);
}

function AccountBanner({ setFade }) {
	const [accountMenuClass, setAccountMenuClass] = useState("hidden");
	const [dropdownSrc, setDropdownSrc] = useState("down");

	const handleLogOut = (e) => {
		localStorage.removeItem("userApiKey");
		setFade(CONTENT_STATE.FADE_OUT);
	};

	const openAccountMenu = (e) => {
		setAccountMenuClass(
			accountMenuClass == "hidden" ? home.accountMenu : "hidden"
		);
		setDropdownSrc(
			dropdownSrc == "down" ? "up" : "down"
		);
	};

	const firstName = window ? localStorage.getItem("firstName") : "";
	const lastName = window ? localStorage.getItem("lastName") : "";

	return (
		<div className={home.accountBanner}>
			<button className={home.accountProfile} onClick={openAccountMenu}>
				<Image width={28} height={28} src="/images/profile.png" />
				<span>{`${firstName} ${lastName}`}</span>
				<div className={home.dropdownArrow}>
					<img width={16} height={16} src={`/images/arrow-${dropdownSrc}.png`} />
				</div>
			</button>
			<ul className={accountMenuClass}>
				<li><Link href="/Settings"><a className={home.settings}>Settings</a></Link></li>
				<li><button className={home.logOut} onClick={handleLogOut}>Log Out</button></li>
			</ul>
		</div>
	);
}

async function getJottings() {
	const userApiKey = window.localStorage.getItem("userApiKey");

	const jottings = await fetch(
		"https://api.jot.bforborum.com/api/v1/jottings",
		{
			method: "GET",
			headers: {
				authorization: "Basic " + userApiKey,
				"content-type": "text/plain",
			},
		}
	);

	if (jottings.status == 200) {
		let { data } = await jottings.json();

		return {
			notes: data.filter((item) => item.source == "note"),
			tasks: data.filter((item) => item.source == "task"),
		};
	}
}
