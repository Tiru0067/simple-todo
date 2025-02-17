import React from "react";
import "./index.css";

function SearchForm({ searchText, setSearchText }) {
  return (
    <form className="search-form">
      <input
        type="search"
        placeholder="search your todos here..."
        className="search-form__input"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}

export default SearchForm;
