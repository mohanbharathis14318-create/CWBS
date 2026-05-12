// Import Modules
import { Pool } from 'pg';
import dotenv from 'dotenv';

// Env Config
dotenv.config();

// Prop Variable
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
})

export default pool;