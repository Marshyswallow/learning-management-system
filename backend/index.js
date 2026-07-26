import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/connectDB.js";
import cookieParser from "cookie-parser";
import authRouter from "./route/authRoute.js";
import cors from "cors";
import userRouter from "./route/userRoute.js";
import courseRouter from "./route/courseRoute.js";
import lectureRouter from "./route/lectureRoute.js";
import orderRouter from "./route/orderRoute.js";

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "hhttps://learning-management-system-j4tz.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },

    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // ✅ add this
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/lecture", lectureRouter);
app.use("/api/order", orderRouter);

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(port, () => {
  console.log("server started");
  connectDb();
});
