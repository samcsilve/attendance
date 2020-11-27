import express from "express";
import path from 'path'
import dotenv from "dotenv";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import hourRoutes from "./routes/hourRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

// Routes go below here
app.use("/api/users", userRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/hours", hourRoutes);
app.use("/api/attendance", attendanceRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;


app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
