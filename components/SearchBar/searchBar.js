import searchBar from "./searchBar.module.css";

export default function SearchBar() {
  return (
    <div className={searchBar.container}>
      <button className={searchBar.searchBarIcon}>
        <img
          className={searchBar.greyCircle}
          src="http://cdn.bforborum.com/images/search-bar-icon.png"
          id="search-bar-icon-img"
        />
      </button>
      <input
        className={searchBar.searchBar}
        type="text"
        placeholder="Search your Jottings"
      />
    </div>
  );
}
