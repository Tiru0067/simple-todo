import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import TodoHeader from "../TodoHeader";
import TodoList from "../TodoList";

function TodoApp() {
  const [isChecked, setIsChecked] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "https://simple-todo-8fnj.onrender.com/todos";
    const fetchTodos = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTodos(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="todo-app__wrapper">
      <main className="todo-app">
        <h1 className="todo-app__title">Todo</h1>
        <TodoHeader toggleCheckbox={toggleCheckbox} isChecked={isChecked} />
        <TodoList todos={todos} />
      </main>
    </div>
  );
}

export default TodoApp;
