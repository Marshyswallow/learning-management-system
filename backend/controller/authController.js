import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import sendMail from "../config/sendMail.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    let existUser = await User.findOne({ email });

    if (existUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Enter valid email"
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Enter strong password"
      });
    }

    let hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role
    });

    let token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(201).json({
      message: "Signup successful",
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: `Signup error: ${error.message}`
    });
  }
};


export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    let isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password"
      });
    }

    let token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: "Login successful",
      user
    });

  } catch (error) {
    return res.status(500).json({
      message: `Login error: ${error.message}`
    });
  }
};


export const logOut = async (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Logout successful"
    });

  } catch (error) {
    return res.status(500).json({
      message: `Logout error: ${error.message}`
    });
  }
};

export const sendOTP= async(req,res)=>{
  try {
    console.log("EMAIL:", process.env.USER_EMAIL)   
    console.log("PASS:", process.env.USER_PASSWORD)
    const{email}=req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.resetOtp = otp;                          
    user.resetOtpExpiry = Date.now() + 5 * 60 * 1000; 

    await user.save()

    await sendMail(email, otp);

    return res.status(200).json({ message: "OTP sent successfully" });

  } catch (error) {
    return res.status(500).json({ message: `Send OTP error: ${error.message}` });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (Date.now() > user.resetOtpExpiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    user.isOtpVerified = true;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    return res.status(500).json({ message: `Verify OTP error: ${error.message}` });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!user.isOtpVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({ message: "Enter strong password" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = "";
    user.resetOtpExpiry = null;
    user.isOtpVerified = false;

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    return res.status(500).json({ message: `Reset password error: ${error.message}` });
  }
};


export const googleAuth = async (req, res) => {
  try {
    const { name, email, role } = req.body
    let user = await User.findOne({ email })

    if (!user && !role) {
      // ✅ login attempt but no account found
      return res.status(404).json({
        message: "No account found. Please signup first."
      })
    }

    if (!user && role) {
      // ✅ signup — create new user
      const randomPassword = await bcrypt.hash(Math.random().toString(36) + email, 10)
      user = await User.create({
        name,
        email,
        role,
        password: randomPassword
      })
    }

    // ✅ existing user — just login
    let token = genToken(user._id)

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    })

    return res.status(200).json({
      message: "Google auth successful",
      user
    })

  } catch (error) {
    return res.status(500).json({ message: `Google auth error: ${error.message}` })
  }
}
