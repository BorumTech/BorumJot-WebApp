import Link from "next/link";
import login from "./login.module.css";
import LogoImage from "../../components/logoImage";
import FormField from "../../components/FormField/formField";
import ProgressSpinner from "../../components/CircularProgress/circularProgress";
import { useState } from "react";

export default function Login({ onFadeOut, fade, onFadeInHome, setFade }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSpinner, setShowSpinner] = useState(false);

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

    const response = await fetch("https://api.jot.bforborum.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}&password=${password}`,
    });

    if ((await response).status == 200) {
      const jsonResponse = await response.json();
      window.localStorage.setItem("userApiKey", jsonResponse.data.api_key);
      onFadeOut();
    } else if (
      (await response).status == 404 ||
      (await response).status == 500
    ) {
      const jsonResponse = await response.json();
      window.alert(jsonResponse.error.message);
    }
  };

  const handleFadeOutEnd = (e) => {
    setShowSpinner(false);
    setFade("invisible");
    onFadeInHome();
  };

  return (
    <main
      onAnimationEnd={handleFadeOutEnd}
      className={fade == "invisible" ? fade : `${fade} ${login.main}`}
    >
      <div className={login.grid}>
        <LogoImage />
        <h1>Login to Borum Jot</h1>
        <form onSubmit={onLogin} method="post" className={login.form}>
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
          <p>
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember Me</label>
          </p>
          <Link href="">
            <a>Forgot password? Reset it</a>
          </Link>
          <button type="submit" className={login.card}>
            {showSpinner ? <ProgressSpinner /> : "Login"}
          </button>
        </form>
        <div className={login.register}>
          <Link href="http://bforborum.com/Register">
            <a target="_blank">New to Borum? Create an Account</a>
          </Link>
        </div>
      </div>
    </main>
  );
}

