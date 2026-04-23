import express from "express";
import cors from "cors";
import { corsOptions } from "./configs/corsOptions";
import { ErrorMiddleware } from "./middlewares/errorHandler";
import { DatabaseService } from "./configs/database";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.send("Backend is Running!");
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/health/db", async (_req, res) => {
  try {
    const prisma = await DatabaseService.getInstance();
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "ok", message: "Database is accessible" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Database is not accessible" });
  }
});

// Catch-all for any server errors
app.use(ErrorMiddleware.handle);

export default app;
