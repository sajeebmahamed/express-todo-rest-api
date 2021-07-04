// external imports
const express = require("express");
const mongoose = require("mongoose");

// internal imports
const {
   notFoundHandler,
   errorHandler,
} = require("./middlewares/common/errorHandler");
const router = require("./router/todoRouter");

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

// request parser
app.use(express.json());

// routing setup
app.use("/", router);

// 404 not found handler
app.use(notFoundHandler);

// default error handler
app.use(errorHandler);

app.listen(5000, () => {
   console.log("Server is listening to the port 5000");
});
