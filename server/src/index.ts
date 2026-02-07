import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize, { testConnection } from "./config/database";
import authRoutes from "./routes/auth";
import bookRoutes from "./routes/book";
import reviewRoutes from "./routes/review";
import User from "./models/User";
import Book from "./models/Book";
import Review from "./models/Review";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// TODO: Add middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// TODO: Add routes
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/review", reviewRoutes);

// TODO: Add a test route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "DevQ&A API is running!" });
});

// TODO: Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
  },
);

// TODO: Start server function
const startServer = async () => {
  // TODO: Test database connection
  await testConnection();

  // TODO: Sync database (creates tables if they don't exist)
  // WARNING: { force: true } will DROP all tables!
  await sequelize.sync({ force: false });
  console.log("✅ Database synced");

  // TODO: Start Express server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
  });
};

// TODO: Call startServer
startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
