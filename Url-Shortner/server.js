import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import urlRoutes from "./routes/urlRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());
app.use("/", urlRoutes);

// test route
app.get("/", (req, res) => {
    res.send("Server is running");
});

// connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});