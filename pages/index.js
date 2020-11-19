import Head from "next/head";
import Layout from "../components/Layout/layout";
import Login from "./Login/login";
import Home from "./Home/home";
import {useEffect, useState} from 'react';
import { CONTENT_STATE } from "../lib/view";

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
    if (localStorage.getItem("userApiKey") && homeFade != CONTENT_STATE.FADE_IN) {
      setHomeFade(CONTENT_STATE.VISIBLE);
    } else {
      if (loginFade != CONTENT_STATE.FADE_IN && homeFade != CONTENT_STATE.FADE_IN) {
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