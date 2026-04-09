import database from "./database.js";
import { config } from "dotenv";

config();

async function dropTable(tableName) {
    try {
        const drop = await database.query(`
            DROP TABLE ${tableName} CASCADE;
            `);
        console.log(`Table ${tableName} dropped`);

    } catch (error) {
        console.error("error while droping the table.", error);
    }
};

const tableName = process.argv[2];

if (!tableName) {
    console.error("Insert a table name");
    process.exit(1);
}

dropTable(tableName);