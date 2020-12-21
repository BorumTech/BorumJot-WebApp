import searchBar from "./searchBar.module.css";
import { useRouter } from "next/router";
import UrlService from "../../libs/UrlService";

export default function SearchBar() {
  const router = useRouter();
  const urlService = new UrlService(router);

  const handleSearch = e => {
    urlService.changeQuery({q: e.target.value});
  };

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
        onChange={handleSearch}
        placeholder="Search your Jottings"
      />
    </div>
  );
}
