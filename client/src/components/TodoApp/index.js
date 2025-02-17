import React from "react";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import "./index.css";
import TodoHeader from "../TodoHeader";
import TodoList from "../TodoList";

function TodoApp() {
  const [isChecked, setIsChecked] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todoText, setTodoText] = useState("");
  const [loading, setLoading] = useState(true);
  const [showTodoForm, setShowTodoForm] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);

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
    const newTodo = {
      id: uuidv4(),
      title: text,
      completed: false,
    };
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setShowTodoForm(false);
    setTodoText("");

    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodo),
    });
  };

  const handleEditTodo = async (text, id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, title: text } : todo
    );
    setTodos(updatedTodos);

    await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: text }),
    });

    setTodoText("");
    setShowTodoForm(false);
  };

  const handleToggleComplete = async (id) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    const newCompletedValue = todoToUpdate.completed ? 0 : 1;

    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: newCompletedValue } : todo
    );
    setTodos(updatedTodos);

    await fetch(`${url}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: newCompletedValue }),
    });
  };

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
          handleEditTodo={handleEditTodo}
          editingTodo={editingTodo}
          setEditingTodo={setEditingTodo}
          handleToggleComplete={handleToggleComplete}
        />
      </main>
    </div>
  );
}

export default TodoApp;
