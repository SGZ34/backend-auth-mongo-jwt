import express from "express";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

//middlewares
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// Rutas

app.use("/api/auth", authRoutes);

export default app;
