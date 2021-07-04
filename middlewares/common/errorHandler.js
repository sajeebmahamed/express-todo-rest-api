// external imports
const createError = require("http-errors");

// 404 not found
function notFoundHandler(_req, _res, next) {
   next(createError(404, "Your requested content was not found!"));
}

// default error handler
function errorHandler(err, _req, res, _next) {
   res.locals.error =
      process.env.NODE_ENV === "development" ? err : { message: err.message };
   res.status(err.status || 500);
   res.json(res.locals.error);
}

module.exports = {
   notFoundHandler,
   errorHandler,
};
