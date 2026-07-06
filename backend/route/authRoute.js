import express from "express"
import {googleAuth, logOut,login,resetPassword,sendOTP,signUp, verifyOTP} from "../controller/authController.js"

const authRouter = express.Router()

authRouter.post("/signup",signUp)
authRouter.post("/login",login)
authRouter.post("/logout", logOut)
authRouter.post("/sendOtp",sendOTP)
authRouter.post("/verifyOtp",verifyOTP)
authRouter.post("/resetPassword",resetPassword)
authRouter.post("/googleAuth",googleAuth)

export default authRouter