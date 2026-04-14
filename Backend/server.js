import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

/**
 * Estructura esperada para cada tarea:
 * {
 *   id: number,
 *   title: string,
 *   description: string,
 *   completed: boolean,
 *   date: string,
 *   comments: string,
 *   tags: string[],
 *   createdAt: string,
 *   updatedAt: string
 * }
 */

// Normalizar una tarea para que siempre tenga la estructura que espera el front
const normalizeTask = (task) => ({
  id: Number(task.id),
  title: typeof task.title === "string" ? task.title.trim() : "",
  description: typeof task.description === "string" ? task.description.trim() : "",
  completed: Boolean(task.completed),
  date: typeof task.date === "string" ? task.date : "",
  comments: typeof task.comments === "string" ? task.comments.trim() : "",
  tags: Array.isArray(task.tags)
    ? task.tags.filter((tag) => typeof tag === "string").map((tag) => tag.trim()).filter(Boolean)
    : [],
  createdAt: task.createdAt || new Date().toISOString(),
  updatedAt: task.updatedAt || new Date().toISOString()
});

// Base de datos temporal en memoria
let tasks = [
  normalizeTask({
    id: 1,
    title: "Ejemplo de tarea",
    description: "Esta es una tarea de ejemplo",
    completed: false,
    date: "",
    comments: "",
    tags: ["demo"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }),
  normalizeTask({
    id: 2,
    title: "Ejemplo de tarea 2",
    description: "Esta es una tarea de ejemplo 2",
    completed: false,
    date: "",
    comments: "",
    tags: ["frontend"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }),
  normalizeTask({
    id: 3,
    title: "Ejemplo de tarea 3",
    description: "Esta es una tarea de ejemplo 3",
    completed: true,
    date: "",
    comments: "",
    tags: ["backend"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
];

let nextId = 4;

// Ruta base
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "API de tareas funcionando correctamente."
  });
});

/**
 * GET /tasks
 * Devuelve todas las tareas
 */
app.get("/tasks", (req, res) => {
  return res.status(200).json(tasks);
});

/**
 * GET /tasks/:id
 * Devuelve una tarea por ID
 */
app.get("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "El id debe ser numérico."
    });
  }

  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return res.status(404).json({
      error: "Tarea no encontrada."
    });
  }

  return res.status(200).json(task);
});

/**
 * POST /tasks
 * Crea una nueva tarea
 * Body esperado:
 * {
 *   title: string,
 *   description?: string,
 *   completed?: boolean,
 *   date?: string,
 *   comments?: string,
 *   tags?: string[]
 * }
 */
app.post("/tasks", (req, res) => {
  try {
    const {
      title,
      description = "",
      completed = false,
      date = "",
      comments = "",
      tags = []
    } = req.body;

    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        error: "El campo 'title' es obligatorio y debe ser una cadena no vacía."
      });
    }

    if (typeof description !== "string") {
      return res.status(400).json({
        error: "El campo 'description' debe ser una cadena."
      });
    }

    if (typeof completed !== "boolean") {
      return res.status(400).json({
        error: "El campo 'completed' debe ser booleano."
      });
    }

    if (typeof date !== "string") {
      return res.status(400).json({
        error: "El campo 'date' debe ser una cadena."
      });
    }

    if (typeof comments !== "string") {
      return res.status(400).json({
        error: "El campo 'comments' debe ser una cadena."
      });
    }

    if (!Array.isArray(tags)) {
      return res.status(400).json({
        error: "El campo 'tags' debe ser un arreglo."
      });
    }

    const now = new Date().toISOString();

    const newTask = normalizeTask({
      id: nextId++,
      title,
      description,
      completed,
      date,
      comments,
      tags,
      createdAt: now,
      updatedAt: now
    });

    tasks.push(newTask);

    return res.status(201).json({
      message: "Tarea creada correctamente.",
      task: newTask
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno al crear la tarea."
    });
  }
});

/**
 * PUT /tasks/:id
 * Actualiza una tarea existente
 * Body permitido:
 * {
 *   title?: string,
 *   description?: string,
 *   completed?: boolean,
 *   date?: string,
 *   comments?: string,
 *   tags?: string[]
 * }
 */
app.put("/tasks/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "El id debe ser numérico."
      });
    }

    const taskIndex = tasks.findIndex((item) => item.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        error: "Tarea no encontrada."
      });
    }

    const currentTask = tasks[taskIndex];
    const {
      title,
      description,
      completed,
      date,
      comments,
      tags
    } = req.body;

    if (title !== undefined) {
      if (typeof title !== "string" || title.trim() === "") {
        return res.status(400).json({
          error: "Si se envía 'title', debe ser una cadena no vacía."
        });
      }
      currentTask.title = title.trim();
    }

    if (description !== undefined) {
      if (typeof description !== "string") {
        return res.status(400).json({
          error: "Si se envía 'description', debe ser una cadena."
        });
      }
      currentTask.description = description.trim();
    }

    if (completed !== undefined) {
      if (typeof completed !== "boolean") {
        return res.status(400).json({
          error: "Si se envía 'completed', debe ser booleano."
        });
      }
      currentTask.completed = completed;
    }

    if (date !== undefined) {
      if (typeof date !== "string") {
        return res.status(400).json({
          error: "Si se envía 'date', debe ser una cadena."
        });
      }
      currentTask.date = date;
    }

    if (comments !== undefined) {
      if (typeof comments !== "string") {
        return res.status(400).json({
          error: "Si se envía 'comments', debe ser una cadena."
        });
      }
      currentTask.comments = comments.trim();
    }

    if (tags !== undefined) {
      if (!Array.isArray(tags)) {
        return res.status(400).json({
          error: "Si se envía 'tags', debe ser un arreglo."
        });
      }
      currentTask.tags = tags
        .filter((tag) => typeof tag === "string")
        .map((tag) => tag.trim())
        .filter(Boolean);
    }

    currentTask.updatedAt = new Date().toISOString();

    tasks[taskIndex] = normalizeTask(currentTask);

    return res.status(200).json({
      message: "Tarea actualizada correctamente.",
      task: tasks[taskIndex]
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno al actualizar la tarea."
    });
  }
});

/**
 * DELETE /tasks/:id
 * Elimina una tarea
 */
app.delete("/tasks/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        error: "El id debe ser numérico."
      });
    }

    const taskIndex = tasks.findIndex((item) => item.id === id);

    if (taskIndex === -1) {
      return res.status(404).json({
        error: "Tarea no encontrada."
      });
    }

    const deletedTask = tasks[taskIndex];
    tasks = tasks.filter((item) => item.id !== id);

    return res.status(200).json({
      message: "Tarea eliminada correctamente.",
      task: deletedTask
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error interno al eliminar la tarea."
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});