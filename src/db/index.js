
import dotenv from "dotenv";
import path from "path";
import { Pool, Client } from "pg";

dotenv.config({ path: './.env' });

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
});

const createTables = async () => {
    const client = await pool.connect();
    try {

        await client.query('BEGIN');

        //userTable
        const userTable = `
        CREATE TABLE IF NOT EXISTS usertable(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            email VARCHAR(100),
            

         );
        `;
        await client.query(userTable);
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error creating tables:', err);
    } finally {
        client.release();
    }
};

createTables().catch((err) => console.error('Error executing createTables:', err.stack));





