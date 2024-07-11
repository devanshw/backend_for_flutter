const { timestamp } = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter user name"],
    },

    password:{
        type:String,
        required: [true, "Please enter password"]
    },

    firstName :{
        type:String,
        required : false
    },

    lastName:{
        type:String,
        required:false
    },

    JobTitle:{
        type:String,
        required:false
    },

    Age: {
      type: Number,
      required: false,
    },

    companyName:{
        type: String,
        required: false,
    },
   

    image: {
      type: String,
      required: false,
    },
    
  },
  {
    timestams: true,
  }

);

const User = mongoose.model("User",userSchema);

module.exports = User; 