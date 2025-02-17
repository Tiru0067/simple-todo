import React from "react";
import { useState, useEffect } from "react";
import "./index.css";
import TodoHeader from "../TodoHeader";
import TodoList from "../TodoList";

function TodoApp() {
  const [isChecked, setIsChecked] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [loading, setLoading] = useState(true);
  const [showTodoForm, setShowTodoForm] = useState(false);

  const url = "https://simple-todo-8fnj.onrender.com/todos";

  useEffect(() => {
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

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      } else {
        console.log("Failed to delete the todo");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTodo = async (text) => {
    const newTodo = { text };
    setTodos((prevTodos) => [...prevTodos, newTodo]);

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
  };

  // const handleEditTodo = async (text, id) => {
  //   const updatedTodos = todos.map((todo) =>
  //     todo.id === id ? { ...todo, text } : todo
  //   );
  //   setTodos(updatedTodos);

  //   await fetch(`${url}/${id}`, {
  //     method: "PUT",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       ...updatedTodos.find((todo) => todo.id === id),
  //       text,
  //     }),
  //   });

  //   setText(null);
  // };

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="todo-app__wrapper">
      <main className="todo-app">
        <h1 className="todo-app__title">Todo</h1>
        <TodoHeader
          toggleCheckbox={toggleCheckbox}
          isChecked={isChecked}
          handleAddTodo={handleAddTodo}
          setShowTodoForm={setShowTodoForm}
        />
        <TodoList
          todos={todos}
          loading={loading}
          deleteTodo={deleteTodo}
          handleAddTodo={handleAddTodo}
          showTodoForm={showTodoForm}
          setShowTodoForm={setShowTodoForm}
          todoText={todoText}
          setTodoText={setTodoText}
        />
      </main>
    </div>
  );
}

export default TodoApp;
