// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/People");

// get users
const allUsers = async (req, res, next) => {
   try {
      const users = await User.find({});
      res.status(200).json({
         message: "All users loaded!.",
         user: users,
      });
   } catch (error) {
      res.status(500).json({
         errors: {
            common: {
               message: error.message,
            },
         },
      });
   }
};

// user login
const login = async (req, res, next) => {
   try {
      // find a user who has this email/username
      const user = await User.findOne({
         $or: [{ email: req.body.username }, { phone: req.body.username }],
      });
      if (user && user._id) {
         const isValidPassword = await bcrypt.compare(
            req.body.password,
            user.password
         );

         if (isValidPassword) {
            // prepare the user object to generate token
            const userObject = {
               username: user.name,
               phone: user.phone,
               email: user.email,
               role: "user",
            };

            // generate token
            const token = jwt.sign(userObject, process.env.JWT_SECRET, {
               expiresIn: process.env.JWT_EXPIRY,
            });
            userObject.token = token;

            // set cookie
            // res.cookie(process.env.COOKIE_NAME, token, {
            //    maxAge: process.env.JWT_EXPIRY,
            //    httpOnly: true,
            //    signed: true,
            // });

            res.status(200).json({
               message: "User login successfull.",
               user: userObject,
            });
         } else {
            throw createError("Login failed! Please try again.");
         }
      } else {
         throw createError("Login failed! Please try again.");
      }
   } catch (error) {
      res.status(500).json({
         errors: {
            common: {
               message: error.message,
            },
         },
      });
   }
};
// user register
const regiser = async (req, res, next) => {
   const hashedPassword = await bcrypt.hash(req.body.password, 10);
   const newUser = new User({ ...req.body, password: hashedPassword });
   try {
      const result = await newUser.save();
      const { _id, name, email, phone } = result;
      res.status(200).json({
         message: "User registration successfull.",
         user: { _id, name, email, phone },
      });
   } catch (error) {
      res.status(500).json({
         errors: {
            common: {
               msg: "Unknown error occured!",
            },
         },
      });
   }
};
module.exports = {
   login,
   regiser,
   allUsers,
};
