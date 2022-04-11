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
        <div className={layout.platformList}>
          <PlatformButton
            downloadLink="https://play.google.com/store/apps/details?id=com.boruminc.borumjot.android"
            imgSrc="/images/platforms/android-icon.png"
            label="Get for free on the Google Play Store"
          />
        </div>
        <p>&copy; 2020-{new Date().getFullYear()} Borum Tech</p>
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
