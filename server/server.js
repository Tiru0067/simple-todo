const express = require("express");
const { open } = require("sqlite");
const path = require("path");
const sqlite3 = require("sqlite3");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const dbPath = path.join(__dirname, "todosDatabase.db");

let db;

const initializeDbServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Create "todo" table if not exists
    const createTableQuery = `CREATE TABLE IF NOT EXISTS todo (
         id INTEGER PRIMARY KEY AUTOINCREMENT,
         title TEXT NOT NULL, 
         description TEXT, 
         completed BOOLEAN DEFAULT 0, 
         created_at DATETIME DEFAULT CURRENT_TIMESTAMP
       );
      `;
    await db.run(createTableQuery);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () =>
      console.log(`Server started at http://localhost:${PORT}`)
    );
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

initializeDbServer();

const toCamelCase = (str) =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

const convertKeysToCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(convertKeysToCamelCase);
  } else if (obj !== null && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        toCamelCase(key),
        convertKeysToCamelCase(value),
      ])
    );
  }
  return obj;
};

app.get("/todos", async (req, res) => {
  try {
    const todos = await db.all(
      "SELECT * FROM todo ORDER BY completed ASC, id ASC"
    );
    res.status(200).send(todos.map((todo) => convertKeysToCamelCase(todo)));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/todos/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const todoItem = await db.get(`SELECT * FROM todo WHERE id=?`, [todoId]);
    res.status(200).send(convertKeysToCamelCase(todoItem));
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const newTodo = req.body;
    if (!newTodo.title) {
      return res.status(400).send("Title is required");
    }

    const columns = Object.keys(newTodo).join(", ");
    const placeholders = Object.keys(newTodo)
      .map(() => "?")
      .join(", ");
    const values = Object.values(newTodo);

    const addTodoQuery = `INSERT INTO todo (${columns}) VALUES (${placeholders});`;
    await db.run(addTodoQuery, values);
    res.status(200).send("Todo successfully created");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.put("/todos/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const updates = req.body;
    const existingTodo = await db.get(`SELECT * FROM todo WHERE id=?`, [
      todoId,
    ]);

    if (existingTodo == undefined) {
      return res.status(404).send("Todo not found");
    }

    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = Object.values(updates);

    const addTodoQuery = `
      UPDATE todo SET ${fields} WHERE id = ?;
    `;

    // console.log(
    //   fields.includes(",")
    //     ? "Todo is updated"
    //     : `${fields.split(",")[0].split(" ")[0]} is updated`
    // );

    await db.run(addTodoQuery, [...values, todoId]);
    res.status(200).send("Todo successfully updated");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.delete("/todos/:todoId", async (req, res) => {
  try {
    const { todoId } = req.params;
    const isTodoExist = await db.get(`SELECT * FROM todo WHERE id = ?;`, [
      todoId,
    ]);
    if (isTodoExist === undefined) {
      return res.status(404).send("Todo not found");
    }

    await db.run("DELETE FROM todo WHERE id = ?;", [todoId]);
    res.status(204).send("Todo successfully Deleted");
  } catch (err) {
    res.status(400).send(err.message);
  }
});
