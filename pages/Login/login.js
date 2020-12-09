import Link from "next/link";
import login from "./login.module.css";
import LogoImage from "../../components/logoImage";
import FormField from "../../components/FormField/formField";
import ProgressSpinner from "../../components/CircularProgress/circularProgress";
import { useRef, useState } from "react";
import { CONTENT_STATE } from "../../lib/view";

export default function Login({ fade, onFadeInHome, setFade }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showSpinner, setShowSpinner] = useState(false);

	const loginForm = useRef(null);

	const handleEmailChange = e => setEmail(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

	/**
	 * Make API request to login to obtain API key
	 * @param {Event} e The event object associated with the form submission
	 */
	const onLogin = async (e) => {
		e.preventDefault();

		setShowSpinner(true);

		// Exit if not all credentials are given
		if (!(email && password)) return;

		const response = await fetch("https://api.bforborum.com/api/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
			body: `email=${email}&password=${password}`,
		});

		if (response.status == 200) {
			const jsonResponse = await response.json();

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
			window.localStorage.setItem("email", jsonResponse.data.email);

			setFade(CONTENT_STATE.FADE_OUT);
		} else if (response.status == 404 || response.status == 500) {
			setShowSpinner(false);
			setPassword("");
			const jsonResponse = await response.json();
			window.alert(jsonResponse.error.message);
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
			<div className={login.grid}>
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
					<Link href="http://forum.bforborum.com/Register">
						<a target="_blank">New to Borum? Create an Account</a>
					</Link>
				</div>
			</div>
		</main>
	);
}
