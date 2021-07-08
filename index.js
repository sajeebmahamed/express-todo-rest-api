// external imports
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");

// internal imports
const {
   notFoundHandler,
   errorHandler,
} = require("./middlewares/common/errorHandler");
const todoRouter = require("./router/todoRouter");
const loginRouter = require("./router/loginRouter");
require("dotenv").config();

// db connection
mongoose
   .connect("mongodb://localhost/express-todo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
   })
   .then(() => console.log("database connection successfull"))
   .catch((err) => console.log(err));

// init app
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// request parser
app.use(express.json());

// routing setup
app.use("/", todoRouter);
app.use("/user", loginRouter);

// 404 not found handler
app.use(notFoundHandler);

// default error handler
app.use(errorHandler);

app.listen(5000, () => {
   console.log("Server is listening to the port 5000");
});
