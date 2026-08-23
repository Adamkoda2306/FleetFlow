import dotenv from "dotenv";

dotenv.config();

import connectDB, { pool } from "../config/db.config";
import { createNotificationTableQuery } from "../models/notification-create.models";

const setupDatabase = async () => {
  try {
    console.log("🔄 Connecting to database...");

    await connectDB();

    console.log("🔄 Setting up database...");

    await pool.execute(createNotificationTableQuery);

    console.log("✅ Notification table is ready");
    console.log("✅ Database setup completed successfully");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

setupDatabase();