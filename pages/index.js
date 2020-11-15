import Head from "next/head";
import Link from "next/link";
import Image from 'next/image';
import home from "./home.module.css";
import FormField from "../components/FormField/formField";
import Layout from "../components/Layout/layout";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  /**
   * Make API request to login to obtain API key
   * @param {Event} e The event object associated with the form submission 
   */
  const onLogin = async (e) => {
    e.preventDefault();
    
    // Exit if not all credentials are given
    if (!(email && password)) return 

    const response = await fetch("https://api.jot.bforborum.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `email=${email}&password=${password}`,
    })

    if ((await response).status == 200) {
      const jsonResponse = await response.json();
      window.localStorage.setItem("userApiKey", jsonResponse.data.api_key);
    }
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
      </main>
    </Layout>
  );
}
