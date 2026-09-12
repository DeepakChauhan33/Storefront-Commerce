const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(

  {

    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    
  },

  {
    timestamps: true,
  }

);

const User = mongoose.model("User", userSchema); // This tells Mongoose to store documents in a collection called users

module.exports = User;