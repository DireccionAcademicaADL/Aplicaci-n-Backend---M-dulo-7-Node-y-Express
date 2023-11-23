import express from "express";
import { writeFile, readFile } from "node:fs/promises";
import { nanoid } from "nanoid";
import cors from "cors";
import "dotenv/config";

import { todoModel } from "./models/todo.model.js";

const app = express();

app.use(express.json());

// <--- Habilitamos CORS
app.use(cors());

// Función para obtener los todos
const getTodos = async () => {
  const fsResponse = await readFile("todos.json", "utf-8");
  const todos = JSON.parse(fsResponse);
  return todos;
};

// GET /todos
app.get("/todos", async (req, res) => {
  try {
    const todos = await todoModel.findAll();
    return res.json(todos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// GET /todos/:id
app.get("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await todoModel.findById(id);

    if (!todo) {
      res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// POST /todos
app.post("/todos", async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const newTodo = {
    title,
    done: false,
  };
  try {
    const todo = await todoModel.create(newTodo);
    return res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /todos/:id
app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const todo = await todoModel.update(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json(todo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// DELETE /todos/:id
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const todo = await todoModel.remove(id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    return res.json({ message: "Todo deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Example app listening on port 5000");
});
