import React from "react";
import { useState, useContext } from "react";

import { IoIosAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import { FaRegSquare, FaCheckSquare } from "react-icons/fa";

import "./index.css";
import SearchForm from "../SearchForum";
import WindowContext from "../../context/windowContext";

function TodoHeader({
  toggleCheckbox,
  isChecked,
  setShowTodoForm,
  searchText,
  setSearchText,
}) {
  const [showSearchBar, setShowSearchbar] = useState(false);

  const { width } = WindowContext();

  const toggleSearchBar = () => {
    setShowSearchbar(!showSearchBar);
  };

  return (
    <header className="todo-header-wrapper">
      <div className="todo-header">
        <button
          className="todo-header__add-todo-button"
          type="button"
          onClick={() => setShowTodoForm(true)}
        >
          <IoIosAdd className="add-todo-button__icon" />
          <span className="add-todo-button__text">Add Todo</span>
        </button>
        <div className="todo-header__right-section">
          <div className="todo-header__search-wrapper">
            {showSearchBar && width > 768 && (
              <SearchForm
                searchText={searchText}
                setSearchText={setSearchText}
              />
            )}
            <button
              className="todo-header__search-btn"
              type="button"
              onClick={toggleSearchBar}
            >
              <CiSearch />
            </button>
          </div>
          <div className="todo-header__hide-completed-section">
            <button
              type="button"
              onClick={toggleCheckbox}
              className={`hide-completed-section__checkbox-btn ${
                isChecked ? "checked" : ""
              }`}
            >
              {isChecked ? <FaCheckSquare /> : <FaRegSquare />}
            </button>
            <label
              htmlFor="completed"
              className="hide-completed-section__label"
            >
              Hide completed
            </label>
          </div>
        </div>
      </div>
      {showSearchBar && width < 768 && (
        <SearchForm searchText={searchText} setSearchText={setSearchText} />
      )}
    </header>
  );
}

export default TodoHeader;
