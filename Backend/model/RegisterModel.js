const mongoose = require("mongoose");

const registerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  profileImage: {
    type: String, 
    required: true,
  },
});
const Register = mongoose.model("Register ", registerSchema);

module.exports = Register;
