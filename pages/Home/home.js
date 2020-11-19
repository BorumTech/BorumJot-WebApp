import home from "./home.module.css";
import LogoImage from "../../components/logoImage";
import SearchBar from "../../components/SearchBar/searchBar";
import NoteList from "../../components/NoteList/noteList";
import { useState, useEffect } from "react";
import ProgressSpinner from "../../components/CircularProgress/circularProgress";
import { CONTENT_STATE } from "../../lib/view";

export default function Home({ fade, onFadeInLogin, setFade }) {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    getJottings().then(response => setNotes(response.notes));    
  }, []);

  const handleLogOut = e => {
    localStorage.removeItem("userApiKey");
    setFade(CONTENT_STATE.FADE_OUT);
  }

  const transitionToLogin = () => {
    onFadeInLogin();
    setFade(CONTENT_STATE.INVISIBLE);
  };

  const handleOnAnimationEnd = e => {
    if (fade == CONTENT_STATE.FADE_OUT) {
      transitionToLogin();
    } else if (fade == CONTENT_STATE.FADE_IN) {
      setFade(CONTENT_STATE.VISIBLE);
    }
  };

  return (
    <main 
      onAnimationEnd={handleOnAnimationEnd}
      className={fade == CONTENT_STATE.INVISIBLE ? fade : `${fade} ${home.main}`}>
      <BrandHeader />
      <SearchBar />
      <div className={home.jottingsList}>
        {notes ? <NoteList notes={notes} /> : <ProgressSpinner />}
      </div>
      <button onClick={handleLogOut}>Log Out</button>
    </main>
  );
}

function BrandHeader() {
  return (
    <div className="brandNameContainer">
      <a href="/">
        <LogoImage />
        <span>Borum Jot</span>
      </a>
    </div>
  );
}

async function getJottings() {
  const userApiKey = window.localStorage.getItem("userApiKey");

  const jottings = await fetch("https://api.jot.bforborum.com/api/v1/jottings", {
    method: "GET",
    headers: {
      "authorization": "Basic " + userApiKey,
      "content-type": "text/plain",
    }
  });

  if (jottings.status == 200) {
    let {data} = await jottings.json();
    
    return {
      notes: data.filter((item) => item.source == "note")
    };
  }
}