import React from "react";
import { useState } from "react";
import { FaRegCircle, FaCircleCheck, FaPen, FaTrash } from "react-icons/fa6";

import "./index.css";

function TodoItem({ todo, deleteTodo, handleAddTodo }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  const toggleDelete = () => {
    deleteTodo(todo.id);
  };

  return (
    <li className={isChecked ? "todo-item done" : "todo-item"}>
      <div className="todo-item__left-section">
        <button
          type="button"
          className="todo-item__checkbox-btn"
          onClick={toggleCheck}
        >
          {isChecked ? (
            <FaCircleCheck />
          ) : (
            <FaRegCircle className="checkbox-outline" />
          )}
        </button>
        <p className="todo-item__title">{todo.title}</p>
      </div>
      <div className="todo-item__buttons-container">
        <button className="todo-item__edit-btn">
          <FaPen />
        </button>
        <button className="todo-item__delete-btn" onClick={toggleDelete}>
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
