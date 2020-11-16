import Head from "next/head";
import Layout from "../components/Layout/layout";
import Login from "./Login/login";
import Home from "./Home/home";
import {useState} from 'react';
import index from './index.module.css';

export default function Index() {
  const [loginFade, setLoginFade] = useState("");
  const [homeFade, setHomeFade] = useState("invisible");

  const handleLoginFadeOut = () => {
    setLoginFade(index.fadeOut);
  }
  
  const handleHomeFadeIn = () => {
    setHomeFade(index.fadeIn);
  };

  return (
    <Layout>
      <Head>
        <title>Borum Jot | Note and task management</title>
      </Head>

      <Login onFadeOut={handleLoginFadeOut} fade={loginFade} onFadeInHome={handleHomeFadeIn} setFade={setLoginFade}/>
      <Home fade={homeFade} />
    </Layout>
  );
}
