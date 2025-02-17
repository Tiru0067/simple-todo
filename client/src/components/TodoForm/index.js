import React from "react";
import "./index.css";

function TodoForm({ setShowTodoForm, todoText, setTodoText, handleAddTodo }) {
  const onSave = (e) => {
    e.preventDefault();
    handleAddTodo(e.target.value);
  };

  return (
    <form className="todo-form" onSubmit={onSave}>
      <input
        type="text"
        className="todo-form__input"
        placeholder="Enter your text here..."
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
      />
      <div className="todo-form__buttons">
        <button
          type="button"
          className="todo-form__cancel-btn"
          onClick={() => setShowTodoForm(false)}
        >
          Cancel
        </button>
        <button type="submit" className="todo-form__save-btn">
          Save
        </button>
      </div>
    </form>
  );
}

export default TodoForm;
