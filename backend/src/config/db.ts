import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'rootcle',
  password: process.env.DB_PASSWORD || '12345678',
  database: process.env.DB_NAME || 'project_management',
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;