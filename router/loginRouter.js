// external imports
const express = require("express");

// internal imports
const { regiser } = require("../controller/loginController");
const {
   registerValidators,
   registerValidatorsHandler,
} = require("../middlewares/user/userValidators");

// define router interface
const router = express.Router();

// user register
router.post(
   "/register",
   registerValidators,
   registerValidatorsHandler,
   regiser
);

module.exports = router;
