import express from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.js";
import { errorMiddleware } from "./middleware/error.js";

const app = express();

config({
  path: "./data/config.env",
});

/**MIDDLE WARE */
// using Middleware to get json data
app.use(express.json());

// To access the cookies
app.use(cookieParser());

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELTE"],
    credentials: true, // this will allow  to send the headers to set the cookie
    // this also need to set this at the frontend to allow withCredentails: true
  })
);

/**ROUTES */
// User Routes
app.use("/api/v1/user", userRouter);
// Task Routes
app.use("/api/v1/task", taskRoutes);

app.use(errorMiddleware);

export default app;
