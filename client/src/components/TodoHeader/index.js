import React from "react";
import { IoIosAdd } from "react-icons/io";
import { CiSearch } from "react-icons/ci";

function TodoHeader() {
  return (
    <header className="todo-header">
      <button className="todo-header__add-todo-button">
        <IoIosAdd className="add-todo-button__add-icon" />
        <span className="add-todo-button__text">Add Todo</span>
      </button>
      <div className="todo-header__search-wrapper">
        <form className="todo-header__todo-search-form"></form>
        <button className="todo-search__button">
          <CiSearch className="todo-search__icon" />
        </button>
      </div>
    </header>
  );
}

export default TodoHeader;
