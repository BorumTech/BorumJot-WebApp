import Head from "next/head";
import Layout from "../components/Layout/layout";
import Login from "./Login/login";
import Home from "./Home/home";
import {useEffect, useState} from 'react';
import { CONTENT_STATE } from "../libs/view";
import { useCookies } from "react-cookie";

export default function Index() {
  const [cookies, setCookie, removeCookie] = useCookies(['id', 'email', 'apiKey']);

  useEffect(() => {
    // If the user is logged in
    if (!(cookies.id && cookies.email && cookies.apiKey) && !process.env.NODE_ENV === 'development') {
      window.location.href = "https://accounts.borumtech.com/login?redirect=Jot";
    }
  }, [cookies.id, cookies.email]);

  return (
    <Layout>
      <Head>
        <title>Borum Jot | Note and task management</title>
      </Head>

      <Home />
    </Layout>
  );
}