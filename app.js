import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import { DATABASE, PORT } from "./app/config/config.js";
import router from "./app/routes/api.js";

const app = express();

dotenv.config();

// Default middleware
app.use(express.json());
app.use(cookieParser());


// MongoDB database connect
mongoose.connect(DATABASE).then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.error("Not Connected " + err);
});


// API routes
app.use("/api", router);


// Server start
app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});