import home from "./home.module.css";
import LogoImage from "../../components/logoImage";
import SearchBar from "../../components/SearchBar/searchBar";
import NoteList from "../../components/NoteList/noteList";
import { useState, useEffect } from "react";
import ProgressSpinner from "../../components/CircularProgress/circularProgress";

export default function Home({ fade }) {
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    getJottings().then(response => setNotes(response.notes));    
  });

  return (
    <main className={fade == "invisible" ? fade : `${fade} ${home.main}`}>
      <BrandHeader />
      <SearchBar />
      <div className={home.jottingsList}>
        {notes ? <NoteList notes={notes} /> : <ProgressSpinner />}
      </div>
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
    headers: {
      "authorization": "Basic " + userApiKey
    }
  });

  if (jottings.status == 200) {
    let data = jottings.json();
    data = jottings.data;
    return {
      notes: data.filter((item) => item.source == "note")
    };
  }
}