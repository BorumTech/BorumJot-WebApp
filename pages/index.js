import Head from "next/head";
import { useEffect } from 'react';
import { useCookies } from "react-cookie";
import Layout from "../components/Layout/layout";
import Home from "./Home/home";

export default function Index(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['id', 'email', 'apiKey']);

  useEffect(() => {
    // If the user is logged in
    if (!(cookies.id && cookies.email && cookies.apiKey) && !process.env.NODE_ENV === 'development') {
      window.location.href = "https://accounts.borumtech.com/login?redirect=Jot";
    } else if (process.env.NODE_ENV === 'development') {
      console.log(props);
      setCookie("apiKey", props.DEFAULT_API_KEY, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)) });
      setCookie("email", props.DEFAULT_EMAIL, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)) });
      setCookie("id", props.DEFAULT_ID, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)) })
      setCookie("firstName", props.DEFAULT_FIRST_NAME, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)) })
      setCookie("lastName", props.DEFAULT_LAST_NAME, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 365)) })
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>Borum Jot | Note and task management</title>
      </Head>
      <Home />
    </Layout>
  );
}

export function getStaticProps() {
  if (process.env.NODE_ENV === 'development') {
    return {
      props: {
        DEFAULT_API_KEY: process.env.NEXT_PUBLIC_DEFAULT_API_KEY,
        DEFAULT_EMAIL: process.env.NEXT_PUBLIC_DEFAULT_EMAIL,
        DEFAULT_ID: process.env.NEXT_PUBLIC_DEFAULT_ID,
        DEFAULT_FIRST_NAME: process.env.NEXT_PUBLIC_DEFAULT_FIRST_NAME,
        DEFAULT_LAST_NAME: process.env.NEXT_PUBLIC_DEFAULT_LAST_NAME
      },
    };
  } else {
    return {
      props: {}
    }
  }
}