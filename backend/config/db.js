import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend directory
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// MySQL Connection Pool
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'sb_solar_energy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
});

// Helper function to test DB connection on startup
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log(`[DB] Successfully connected to MySQL database: ${process.env.DB_NAME || 'sb_solar_energy'}`);
    connection.release();
    return true;
  } catch (error) {
    console.warn(`[DB WARNING] Could not connect to MySQL: ${error.message}`);
    console.warn(`[DB HINT] Make sure MySQL service is running (e.g. XAMPP, WAMP, Docker or local MySQL) and database '${process.env.DB_NAME || 'sb_solar_energy'}' exists.`);
    return false;
  }
}

export default pool;

