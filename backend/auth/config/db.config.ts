import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";

const caPath = path.join(process.cwd(), "certs", "ca.pem");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    ca: fs.readFileSync(caPath),
    rejectUnauthorized: true,
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

const connectDB = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();

    console.log("✅ Aiven MySQL connected successfully");

    connection.release();
  } catch (error) {
    console.error("❌ Aiven MySQL connection failed:", error);
    process.exit(1);
  }
};

export { pool };
export default connectDB;