import Head from "next/head";
import Link from "next/link";
import {getPrivacyPolicyContent} from '../../lib/legal';

export default function PrivacyPolicy(props) {
  return (
    <div className="container">
      <Head>
        <link
          href="http://audio.bforborum.com/css/sub.css"
          rel="stylesheet"
          type="text/css"
        />
        <link
          href="http://audio.bforborum.com/pages/legal/legal.css"
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
        <div className="grid">
          <div className="brand-name-container">
            <Link href="/">
              <a>
                <img src="/images/icon.png" />
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
    </div>
  );
}

export async function getStaticProps() {
    return {
        props: {
            content: await getPrivacyPolicyContent()
        },
    };
}
