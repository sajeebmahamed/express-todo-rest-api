// external imports
const express = require("express");

// internal imports
const { regiser, login, allUsers } = require("../controller/loginController");
const checkLogin = require("../middlewares/auth_gurd/checkLogin");
const {
   registerValidators,
   registerValidatorsHandler,
   doLoginValidators,
   doLoginValidationHandlers,
} = require("../middlewares/user/userValidators");

// define router interface
const router = express.Router();

// load all users
router.get("/all", checkLogin, allUsers);

// user login
router.post("/login", doLoginValidators, doLoginValidationHandlers, login);

// user register
router.post(
   "/register",
   registerValidators,
   registerValidatorsHandler,
   regiser
);

module.exports = router;
