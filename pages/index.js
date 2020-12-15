import Head from "next/head";
import Layout from "../components/Layout/layout";
import Login from "./Login/login";
import Home from "./Home/home";
import {useEffect, useState} from 'react';
import { CONTENT_STATE } from "../libs/view";

export default function Index() {
  const [loginFade, setLoginFade] = useState(CONTENT_STATE.INVISIBLE);
  const [homeFade, setHomeFade] = useState(CONTENT_STATE.INVISIBLE);
  
  const handleHomeFadeIn = () => {
    setHomeFade(CONTENT_STATE.FADE_IN);
  };

  const handleLoginFadeIn = () => {
    setLoginFade(CONTENT_STATE.FADE_IN);
  };

  useEffect(() => {
    // If the user is logged in
    if (localStorage.getItem("userApiKey")) {
      if (homeFade != CONTENT_STATE.FADE_IN && loginFade != CONTENT_STATE.FADE_OUT) {
        setHomeFade(CONTENT_STATE.VISIBLE);
      }
    } else { // If the user is logged out
      if (loginFade != CONTENT_STATE.FADE_IN && homeFade != CONTENT_STATE.FADE_IN && homeFade != CONTENT_STATE.FADE_OUT) {
        setLoginFade(CONTENT_STATE.VISIBLE);
      }
    }
  }, [loginFade, homeFade]);

  return (
    <Layout>
      <Head>
        <title>Borum Jot | Note and task management</title>
      </Head>

      <Login fade={loginFade} onFadeInHome={handleHomeFadeIn} setFade={setLoginFade} />
      {homeFade != CONTENT_STATE.INVISIBLE ? <Home fade={homeFade} onFadeInLogin={handleLoginFadeIn} setFade={setHomeFade} /> : ""}
    </Layout>
  );
}