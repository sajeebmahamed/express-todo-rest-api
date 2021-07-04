// external imports
const { check, validationResult } = require("express-validator");

const checkaddTodo = [
   check("title")
      .isLength({ min: 1 })
      .withMessage("Title is required.")
      .isAlpha("en-US", { ignore: " -" })
      .withMessage("Title must not contain anything other than alphabet")
      .trim(),
   check("isCompleted")
      .isLength({ min: 1 })
      .withMessage("isCompleted required."),
];

const addTodoValidationResult = function (req, res, next) {
   const errors = validationResult(req);
   const mappedErrors = errors.mapped();

   if (Object.keys(mappedErrors).length === 0) {
      next();
   } else {
      res.status(500).json({
         errors: mappedErrors,
      });
   }
};

module.exports = {
   checkaddTodo,
   addTodoValidationResult,
};
