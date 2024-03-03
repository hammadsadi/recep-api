import cors from "cors";
import colors from "colors";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import itemRoutes from "./routes/item.js";
import connectWithMongoDb from "./config/db.js";
import erroHandler from "./middlewares/handleError.js";

// Environment Variable
dotenv.config();
const PORT = process.env.PORT || 4000;

// Init Express
const app = express();

// Static Folder
app.use(express.static("public"));

// Form Data manage
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Init Cookie Parser
app.use(cookieParser());

// Init Cors
app.use(
  cors({
    origin: "http://localhost:3030",
    credentials: true,
  })
);

// Error Handler
app.use(erroHandler);

// Routing
app.use("/api/v1/item", itemRoutes);

// Listen Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`.bgGreen.black);
  connectWithMongoDb();
});
