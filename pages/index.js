import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import home from "./home.module.css";
import PlatformButton from "../components/PlatformButton/platformButton";
import FormField from "../components/FormField/formField";
import Layout from "../components/Layout/layout";
import { useLocalStorage } from "../lib/localstorage";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userApiKey, setUserApiKey] = useLocalStorage("userApiKey", "");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onLogin = async (e) => {
    e.preventDefault();

    fetch("https://api.jot.bforborum.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}&password=${password}`,
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((response) => {
        setUserApiKey(response.data.api_key);
      });
  };

  return (
    <Layout>
      <Head>
        <title>Borum Jot | Note and task management</title>
      </Head>

      <main className={home.main}>
        <div className={home.grid}>
          <Image width={70} height={70} src="/images/favicon/icon.png" />
          <h1>Login to Borum Jot</h1>
          <form onSubmit={onLogin} method="post" className={home.form}>
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
            <Link href="">
              <a>Forgot password? Reset it</a>
            </Link>
            <button type="submit" className={home.card}>Login</button>
          </form>
          <div className={home.register}>
            <Link href="http://bforborum.com/Register">
              <a target="_blank">New to Borum? Create an Account</a>
            </Link>
          </div>
        </div>
        <div className={home.grid}>
          <PlatformButton
            downloadLink="https://play.google.com/store/apps/details?id=com.boruminc.borumjot.android"
            imgSrc="/images/platforms/android-icon.png"
            label="Get for free on the Google Play Store"
          />
        </div>
      </main>
    </Layout>
  );
}
