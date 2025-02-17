import React from "react";
import TodoItem from "../TodoItem";
import { CircleLoader } from "react-spinners";

import "./index.css";
import TodoForm from "../TodoForm";

function TodoList(props) {
  const {
    todos,
    loading,
    deleteTodo,
    handleAddTodo,
    showTodoForm,
    setShowTodoForm,
    todoText,
    setTodoText,
  } = props;

  return (
    <div className="todo-list-wrapper">
      {showTodoForm && (
        <TodoForm
          setShowTodoForm={setShowTodoForm}
          handleAddTodo={handleAddTodo}
          todoText={todoText}
          setTodoText={setTodoText}
        />
      )}
      <ul className="todo-list">
        {loading ? (
          <div className="loading-container">
            <CircleLoader color="#36D7B7" loading={loading} size={50} />
          </div>
        ) : todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              handleAddTodo={handleAddTodo}
            />
          ))
        ) : (
          <p>No todos available.</p>
        )}
      </ul>
    </div>
  );
}

export default TodoList;
