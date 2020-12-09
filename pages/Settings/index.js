import settings from "./settings.module.css";
import Layout from "../../components/Layout/layout";
import Head from "next/head";

export default function Settings(props) {
    return (
        <Layout>
            <Head>
                <title>Settings - Borum Jot</title>
            </Head>

            <button>Change Sign In</button>
        </Layout>
    );
}