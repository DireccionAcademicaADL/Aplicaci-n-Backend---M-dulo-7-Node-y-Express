import { todoController } from "../controllers/todo.controller.js";

import { Router } from "express";

const router = Router();

// GET /todos
router.get("/", todoController.read);

// GET /todos/:id
router.get("/:id", todoController.readById);

// POST /todos
router.post("/", todoController.create);

// PUT /todos/:id
router.put("/:id", todoController.update);

// DELETE /todos/:id
router.delete("/:id", todoController.remove);

export default router;
