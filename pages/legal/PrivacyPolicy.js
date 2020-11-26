import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout/layout";
import {getPrivacyPolicyContent} from '../../lib/legal';
import privacyPolicy from "./privacyPolicy.module.css";

export default function PrivacyPolicy(props) {
  return (
    <Layout>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/gh/Borumer/Flytrap@1cca457/css/sub.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/Borumer/Flytrap@1cca457/legal/legal.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap"
          rel="stylesheet"
        />
        <title>Borum Jot Privacy Policy</title>
      </Head>

      <main>
        <div className={privacyPolicy.grid}>
          <div className="brand-name-container">
            <Link href="/">
              <a>
                <img src="/images/favicon/icon.png" />
                <span>Borum Jot</span>
              </a>
            </Link>
          </div>

          <h1>Privacy Policy</h1>
          <article
            className="legal-document-content"
            dangerouslySetInnerHTML={{__html: props.content}}
          />
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
    return {
        props: {
            content: await getPrivacyPolicyContent()
        },
    };
}
