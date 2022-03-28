import AccountBanner from "../../components/AccountBanner/accountBanner";
import BrandHeader from "../../components/BrandHeader/brandHeader";
import BrowserCompatibilityInfo from "../../components/BrowserCompatibilityInfo/browserCompatibilityInfo";
import JottingsControl from "../../components/JottingsControls/jottingsControl";
import MobileNav from "../../components/MobileNav/MobileNav";
import SearchBar from "../../components/SearchBar/searchBar";
import {
	CONTENT_STATE
} from "../../libs/view";
import home from "./home.module.css";

export default function Home({ fade, onFadeInLogin, setFade }) {
	const transitionToLogin = () => {
		onFadeInLogin();
		setFade(CONTENT_STATE.INVISIBLE);
	};

	const handleOnAnimationEnd = () => {
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

			<BrowserCompatibilityInfo />

			<AccountBanner setFade={setFade} />

			<MobileNav />
			<JottingsControl />
		</main>
	);
}

