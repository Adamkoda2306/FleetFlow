import dotenv from "dotenv";

dotenv.config();

import connectDB, { pool } from "../config/db.config";
import { createUsersTableQuery, createAddressTableQuery, createHistoryTableQuery } from "../models/user-create.model";

const setupDatabase = async () => {
  try {
    console.log("🔄 Connecting to database...");

    await connectDB();

    console.log("🔄 Setting up database...");

    await pool.execute(createUsersTableQuery);

    console.log("✅ Users Main table is ready");
    console.log("✅ Database setup completed successfully");

    await pool.execute(createAddressTableQuery);

    console.log("✅ Users Address table is ready");
    console.log("✅ Database setup completed successfully");

    await pool.execute(createHistoryTableQuery);

    console.log("✅ Users History table is ready");
    console.log("✅ Database setup completed successfully");
  } catch (error) {
    console.error("❌ Database setup failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

setupDatabase();