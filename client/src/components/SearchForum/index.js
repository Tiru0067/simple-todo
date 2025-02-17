import React from "react";
import "./index.css";

function SearchForm() {
  return (
    <form className="search-form">
      <input
        type="search"
        placeholder="search your todos here..."
        className="search-form__input"
      />
    </form>
  );
}

export default SearchForm;
