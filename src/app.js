import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// User Router
import { router as userRouter } from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

export { app };
