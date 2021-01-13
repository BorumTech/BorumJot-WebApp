import Link from "next/link";
import Image from "next/image";
import login from "./login.module.css";
import LogoImage from "../../components/logoImage";
import FormField from "../../components/FormField/formField";
import ProgressSpinner from "../../components/CircularProgress/circularProgress";
import { useRef, useState } from "react";
import { CONTENT_STATE } from "../../libs/view";
import { submitLogin } from "../../libs/Datastore/requests";
import FeatureListItem from "../../components/FeatureListItem/featureListItem";

export default function Login({ fade, onFadeInHome, setFade }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showSpinner, setShowSpinner] = useState(false);

	const loginForm = useRef(null);

	const handleEmailChange = (e) => setEmail(e.target.value);
	const handlePasswordChange = (e) => setPassword(e.target.value);

	/**
	 * Make API request to login to obtain API key
	 * @param {Event} e The event object associated with the form submission
	 */
	const onLogin = async (e) => {
		e.preventDefault();

		setShowSpinner(true);

		// Exit if not all credentials are given
		if (!(email && password)) return;

		try {
			const jsonResponse = await submitLogin(email, password);
			// Store user information + user's api key so requests aren't needed later
			window.localStorage.setItem(
				"userApiKey",
				jsonResponse.data.api_key
			);
			window.localStorage.setItem(
				"firstName",
				jsonResponse.data.first_name
			);
			window.localStorage.setItem(
				"lastName",
				jsonResponse.data.last_name
			);
			window.localStorage.setItem("email", email);

			setFade(CONTENT_STATE.FADE_OUT);
		} catch (error) {
			setShowSpinner(false);
			setPassword("");
			window.alert(error);
		}
	};

	const handleOnAnimationEnd = (e) => {
		if (fade == CONTENT_STATE.FADE_OUT) {
			setShowSpinner(false);
			onFadeInHome();
			setFade(CONTENT_STATE.INVISIBLE);

			// Reset email and password so they don't see their original input, unless they saved it in the browser
			setEmail("");
			setPassword("");

			// Use timeout so the reset works, reset form so the red borders don't show up
			setTimeout(() => {
				loginForm.current.reset();
			}, 100);
		} else if (fade == CONTENT_STATE.FADE_IN) {
			setFade(CONTENT_STATE.VISIBLE);
		}
	};

	return (
		<main
			onAnimationEnd={handleOnAnimationEnd}
			className={
				fade == CONTENT_STATE.INVISIBLE ? fade : `${fade} ${login.main}`
			}
		>
			<div className={login.login}>
				<LogoImage />
				<h1>Login to Borum Jot</h1>
				<form
					ref={loginForm}
					onSubmit={onLogin}
					method="post"
					className={login.form}
				>
					<FormField
						required
						onChange={handleEmailChange}
						value={email}
						focus
						format="email"
						label="Email"
					/>
					<FormField
						required
						onChange={handlePasswordChange}
						value={password}
						format="password"
						label="Password"
					/>
					<Link href="http://forum.bforborum.com/reset_password">
						<a target="_blank">Forgot password? Reset it</a>
					</Link>
					<button type="submit" className={login.card}>
						{showSpinner ? <ProgressSpinner /> : "Login"}
					</button>
				</form>
				<div className={login.register}>
					<Link href="https://accounts.bforborum.com">
						<a target="_blank">New to Borum? Create an Account</a>
					</Link>
				</div>
			</div>
			<div className={login.whyBorumJotContainer}>
				<h2>Achieve More with Borum Jot</h2>
				<p>
					Borum Jot stores your notes and tasks so you can access them
					on the web or with the Android app
				</p>
				<ul className={login.featureList}>
					<FeatureListItem
						imgSrc="/images/no-money.png"
						heading="Modern experience"
						description="No ads or hidden prices"
					/>
					<FeatureListItem
						imgSrc="/images/cloud-sync.png"
						heading="Always within reach"
						description="Accessible on an Android device or the web, syncing automatically"
					/>
					<FeatureListItem
						imgSrc="/images/padlock.png"
						heading="Privacy"
						description="Your notes and tasks are securely encrypted"
					/>
					<FeatureListItem
						imgSrc="/images/share.png"
						imgWidth={35}
						imgHeight={55}
						heading="Collaboration"
						description="Share notes and collaborate with others"
					/>
					<FeatureListItem 
						imgSrc="/images/pin.png"
						heading="Prioritize"
						description="Pin your notes and tasks to the top of the lists"
					/>
					<FeatureListItem
						imgSrc="/images/to-do-list.png"
						heading="Stay organized"
						description="Make subtasks for your tasks and check them off when finished"
					/>
				</ul>
			</div>
		</main>
	);
}
