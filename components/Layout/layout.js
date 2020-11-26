import layout from "./layout.module.css";
import Head from "next/head";
import Link from "next/link";
import PlatformButton from "../PlatformButton/platformButton";

export default function Layout(props) {
  return (
    <div className={layout.container}>
      <Head>
        <link rel="icon" href="/images/favicon/favicon.ico" />
      </Head>

      {props.children}

      <footer className={layout.footer}>
        <a
          className={layout.vercelText}
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className={layout.logo} />
        </a>
        <p>&copy; 2020 Borum Tech</p>
        <div className={layout.platformList}>
          <PlatformButton
            downloadLink="https://play.google.com/store/apps/details?id=com.boruminc.borumjot.android"
            imgSrc="/images/platforms/android-icon.png"
            label="Get for free on the Google Play Store"
          />
        </div>
        <ul className={layout.legalLinks}>
          <li className={layout.privacyPolicy}>
            <Link href="/legal/PrivacyPolicy">
              <a>Privacy Policy</a>
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
