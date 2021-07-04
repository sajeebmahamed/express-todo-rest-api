// external imports
const createError = require("http-errors");

// internal imports
const Todo = require("../models/Todo");

// delete a todo
const deleteTodo = async (req, res) => {
   const { id } = req.params;
   try {
      const todo = await Todo.findByIdAndDelete({
         _id: id,
      });
      const todos = await Todo.find();
      return res.status(201).json({ message: "todo deleted", todos });
   } catch (error) {
      res.status(500).json({
         errors: {
            common: {
               message: "Could not delete!",
            },
         },
      });
   }
};

const patchTodo = async (req, res, next) => {
   try {
      const { id } = req.params;
      const { title, isCompleted } = req.body;
      const todo = await Todo.findByIdAndUpdate(
         id,
         {
            $set: {
               title,
               isCompleted,
            },
         },
         { new: true }
      );
      res.status(201).json({ message: "Todo Updated", todo });
   } catch (error) {
      next(
         createError(401, `Requested todo for Id ${req.params.id} is not found`)
      );
   }
};

const updateTodo = async (req, res, next) => {
   try {
      const { id } = req.params;
      const { title, isCompleted } = req.body;
      const todo = await Todo.findByIdAndUpdate(
         id,
         {
            $set: {
               title,
               isCompleted,
            },
         },
         { new: true }
      );
      const todos = await Todo.find();
      res.status(201).json({ message: "Todo Updated", todos });
   } catch (error) {
      next(
         createError(401, `Requested todo for Id ${req.params.id} is not found`)
      );
   }
};

// get a todo
const getTodo = async (req, res, next) => {
   try {
      const todo = await Todo.findById({
         _id: req.params.id,
      });
      res.status(200).json({ message: "Todo", todo });
   } catch (error) {
      next(
         createError(401, `Requested todo for Id ${req.params.id} is not found`)
      );
   }
};
// get all todos
const getTodos = async (req, res, next) => {
   try {
      const todos = await Todo.find();
      res.status(200).json({ message: "All Todos loaded!", todos });
   } catch (error) {
      next(error);
   }
};

// create todo
const createTodo = async (req, res) => {
   const { title } = await req.body;
   const todo = {
      title,
      isCompleted: false,
   };
   const newTodo = new Todo(todo);
   try {
      const result = await newTodo.save();
      const todos = await Todo.find();
      res.status(201).json({ message: "Todo added successfully.", todos });
   } catch (error) {
      res.status(500).json({
         errors: {
            common: {
               message: "Unkown error occured!.",
            },
         },
      });
   }
};

module.exports = {
   deleteTodo,
   patchTodo,
   updateTodo,
   getTodo,
   getTodos,
   createTodo,
};
