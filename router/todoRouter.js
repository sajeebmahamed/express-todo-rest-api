// external imports
const express = require("express");
const {
   createTodo,
   deleteTodo,
   patchTodo,
   updateTodo,
   getTodo,
   getTodos,
} = require("../controller/todoController");
const checkLogin = require("../middlewares/auth_gurd/checkLogin");
const {
   checkaddTodo,
   addTodoValidationResult,
} = require("../middlewares/todo/todoValidator");

// define router interface
const router = express.Router();

//delete todo
router.delete("/:id", deleteTodo);

// patch
router.patch("/:id", patchTodo);

// update todo
router.put("/:id", checkaddTodo, addTodoValidationResult, updateTodo);

// get a todo
router.get("/:id", getTodo);

// get todos
router.get("/", checkLogin, getTodos);

// create a todo
router.post("/", checkLogin, checkaddTodo, addTodoValidationResult, createTodo);

module.exports = router;
