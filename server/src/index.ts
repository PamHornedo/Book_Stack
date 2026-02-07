import dotenv from "dotenv";
import sequelize, { testConnection } from "./config/database";
import app from "./app";
import "./models/Index";

dotenv.config();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await testConnection();

  await sequelize.sync({ force: false });
  console.log("✅ Database synced");

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api/health`);
  });
};

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
