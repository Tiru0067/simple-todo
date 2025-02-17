import React from "react";
import TodoItem from "../TodoItem";

import "./index.css";

function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.length > 0 ? (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <p>loading...</p>
      )}
    </ul>
  );
}

export default TodoList;
