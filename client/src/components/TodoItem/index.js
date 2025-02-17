import React from "react";
import { useState } from "react";
import { FaRegCircle, FaCircleCheck, FaPen, FaTrash } from "react-icons/fa6";

import "./index.css";

function TodoItem({
  todo,
  deleteTodo,
  setShowTodoForm,
  setTodoText,
  setEditingTodo,
  handleToggleComplete,
}) {
  const [isChecked, setIsChecked] = useState(todo.completed === 1);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
    handleToggleComplete(todo.id);
  };

  const toggleDelete = () => {
    deleteTodo(todo.id);
  };

  const toggleEdit = () => {
    setEditingTodo(todo.id);
    setTodoText(todo.title);
    setShowTodoForm(true);
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
        <button
          className="todo-item__edit-btn"
          type="text"
          onClick={toggleEdit}
        >
          <FaPen />
        </button>
        <button
          className="todo-item__delete-btn"
          type="button"
          onClick={toggleDelete}
        >
          <FaTrash />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
