import home from "./home.module.css";
import LogoImage from "../../components/logoImage";

export default function Home({ fade }) {
  return (
    <main className={fade == "invisible" ? fade : `${fade} ${home.main}`}>
      <BrandHeader />
    </main>
  );
}

function BrandHeader() {
  return (
    <div className="brand-name-container">
      <a href="/">
        <LogoImage />
        <span>Borum Jot</span>
      </a>
    </div>
  );
}