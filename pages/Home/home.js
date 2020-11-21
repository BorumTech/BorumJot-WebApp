import home from "./home.module.css";
import LogoImage from "../../components/logoImage";
import SearchBar from "../../components/SearchBar/searchBar";
import NoteList from "../../components/JottingList/noteList";
import TaskList from "../../components/JottingList/taskList";
import { useState, useEffect } from "react";
import ProgressSpinner from "../../components/CircularProgress/circularProgress";
import { CONTENT_STATE } from "../../lib/view";

export default function Home({ fade, onFadeInLogin, setFade }) {
  const [notes, setNotes] = useState(null);
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    getJottings().then((response) => {
      setNotes(response.notes);
      setTasks(response.tasks);
    });
  }, []);

  const transitionToLogin = () => {
    onFadeInLogin();
    setFade(CONTENT_STATE.INVISIBLE);
  };

  const handleOnAnimationEnd = (e) => {
    if (fade == CONTENT_STATE.FADE_OUT) {
      transitionToLogin();
    } else if (fade == CONTENT_STATE.FADE_IN) {
      setFade(CONTENT_STATE.VISIBLE);
    }
  };

  return (
    <main
      onAnimationEnd={handleOnAnimationEnd}
      className={
        fade == CONTENT_STATE.INVISIBLE ? fade : `${fade} ${home.main}`
      }
    >
      <BrandHeader />
      <SearchBar />
      <div className={home.ownNoteList}>
        {notes ? <NoteList notes={notes} /> : <ProgressSpinner />}
      </div>
      <div className={home.ownTaskList}>
        {tasks ? <TaskList tasks={tasks} /> : <ProgressSpinner />}
      </div>
      <AccountBanner />
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

function AccountBanner() {
  const [accountMenuClass, setAccountMenuClass] = useState("hidden");

  const handleLogOut = (e) => {
    localStorage.removeItem("userApiKey");
    setFade(CONTENT_STATE.FADE_OUT);
  };

  const openAccountMenu = e => {
    setAccountMenuClass(accountMenuClass == "hidden" ? home.accountMenu : "hidden");
  };

  const firstName = window ? localStorage.getItem("firstName") : "";
  const lastName = window ? localStorage.getItem("lastName") : "";

  return (
    <div className={home.accountBanner}>
      <div className={home.account}>
        <button className={home.profileBtn} onClick={openAccountMenu}>{`${firstName} ${lastName}`}</button>
      </div>
      <div className={accountMenuClass}>
          <button className={home.logOut} onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
}

async function getJottings() {
  const userApiKey = window.localStorage.getItem("userApiKey");

  const jottings = await fetch(
    "https://api.jot.bforborum.com/api/v1/jottings",
    {
      method: "GET",
      headers: {
        authorization: "Basic " + userApiKey,
        "content-type": "text/plain",
      },
    }
  );

  if (jottings.status == 200) {
    let { data } = await jottings.json();

    return {
      notes: data.filter((item) => item.source == "note"),
      tasks: data.filter((item) => item.source == "task"),
    };
  }
}
