import Razorpay from "razorpay";
import crypto from "crypto";
import Course from "../model/courseModel.js";
import User from "../model/userModel.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
export const RazorpayOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const order = await razorpay.orders.create({
      amount: course.price * 100,
      currency: "INR",
      receipt: `course_${courseId}`,
    });

    return res.status(200).json({ order, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    return res.status(500).json({ message: "Failed to create Razorpay order" });
  }
};

// Verify payment and enroll student
export const verifyPayment = async (req, res) => {
  try {
    const { courseId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const user = await User.findById(req.userId);
    const course = await Course.findById(courseId);

    if (!user || !course) {
      return res.status(404).json({ message: "User or course not found" });
    }

    if (!user.enrolledCourses.some((id) => String(id) === String(courseId))) {
      user.enrolledCourses.push(courseId);
      await user.save();
    }

    if (!course.enrolledStudents.some((id) => String(id) === String(req.userId))) {
      course.enrolledStudents.push(req.userId);
      await course.save();
    }

    return res.status(200).json({ message: "Payment verified and course unlocked" });
  } catch (error) {
    return res.status(500).json({ message: "Payment verification failed" });
  }
};
