import searchBar from "./searchBar.module.css";

export default function SearchBar() {
  return (
    <div className={searchBar.container}>
      <button className={searchBar.searchBarIcon}>
        <img
          className={searchBar.greyCircle}
          src="https://cdn.jsdelivr.net/gh/Borumer/Borum@v1.2.0/staticassets/images/search-bar-icon.png"
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
