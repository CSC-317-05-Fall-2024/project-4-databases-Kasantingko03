/* Establish the DB connection pool here. */
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config(); 

const { Pool } = pg;

// Create a pool using the connection string from the .env file
const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
});

export { pool };
