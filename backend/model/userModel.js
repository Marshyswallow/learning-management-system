import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  description: {
    type: String
  },

  password: {
    type: String,
    required: true
  },

  role: {
    type: String,
    enum: ["student", "educator"],
    required: true
  },

  photoUrl: {
    type: String,
    default: ""
  },

  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }],

  resetOtp: {
    type: String,
    default: ""
  },

  resetOtpExpiry: {
    type: Date,
    default: null
  },

  isOtpVerified:{
    type:Boolean,
    default:false
  }

  

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;