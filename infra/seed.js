import database from "./database.js";
import { config } from "dotenv";

config();

async function seedDb(tableName) {
    try {
        const seedTable = await database.query(`
        CREATE TABLE IF NOT EXISTS ${tableName} (
                transaction_id uuid PRIMARY KEY,
                bank VARCHAR(100) NOT NULL,
                value NUMERIC(8, 2) NOT NULL,
                category VARCHAR(255),
                type VARCHAR(30),
                transaction_date TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );`);
        console.log(`Table ${tableName} created!`);
        
        const transactions = await database.query(`
        SELECT * FROM transactions;
    `);
    
    console.log("Transactions: ", transactions.rows);
    } catch (error) {
    console.error("error creating tables.", error);
    }
}
const tableName = process.argv[2];

seedDb(tableName);