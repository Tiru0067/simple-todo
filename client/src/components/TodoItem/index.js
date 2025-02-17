import React from "react";
import { useState } from "react";
import {
  FaRegCircle,
  FaCircleCheck,
  FaEllipsisVertical,
} from "react-icons/fa6";

import "./index.css";

function TodoItem({ todo }) {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <li className="todo-item">
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
      <button className="todo-item__menu-btn">
        <FaEllipsisVertical />
      </button>
    </li>
  );
}

export default TodoItem;
