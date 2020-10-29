import Head from "next/head";
import Link from "next/link";
import home from "./home.module.css";
import PlatformButton from "../components/PlatformButton/platformButton";
import FormField from "../components/FormField/formField";
import Layout from "../components/Layout/layout";

export default function Home() {
  const onLogin = async (e) => {
    e.preventDefault();

    const formEl = e.target.parentElement;

    const email = formEl.elements["Email"].value;
    const password = formEl.elements["Password"].value;
    const body = "email=" + email + "&password=" + password;

    fetch("https://api.jot.bforborum.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    })
      .then((response) => {
        if (response.status == 200) {
          return response.json();
        }
      })
      .then((response) => {
        localStorage.useLocalStorage("userApiKey", response.data.api_key);
        Router.push("/");
      });
  };

  return (
    <Layout>
      <Head>
        <title>Borum Jot | Note and task management</title>
      </Head>

      <main className={home.main}>
        <div className={home.grid}>
          <form method="post" action="" className={home.form}>
            <h1>Login</h1>
            <FormField required focus format="email" label="Email" />
            <FormField required format="password" label="Password" />
            <Link href="">
              <a>Forgot password? Reset it</a>
            </Link>
            <Link href="/Register">
              <a>Don't have an account? Register</a>
            </Link>
          </form>
          <button className={home.card}>
            <Link href="/Login">
              <a>Login</a>
            </Link>
          </button>
          <button className={home.card}>
            <Link href="/Register">
              <a>Register</a>
            </Link>
          </button>
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
