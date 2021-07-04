// external imports
const bcrypt = require("bcrypt");

// internal imports
const User = require("../models/People");

// register
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
   regiser,
};
