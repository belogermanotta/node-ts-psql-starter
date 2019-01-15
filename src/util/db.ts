import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { createConnection, Connection } from "typeorm";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}
export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'

export const SESSION_SECRET = process.env["SESSION_SECRET"];
export const DATABASE_HOST = process.env["DATABASE_HOST"];
export const DATABASE_PORT = process.env["DATABASE_PORT"];
export const DATABASE_TYPE = process.env["DATABASE_TYPE"];
export const DATABASE_NAME = process.env["DATABASE_NAME"];
export const DATABASE_USERNAME = process.env["DATABASE_USERNAME"];
export const DATABASE_PASSWORD = process.env["DATABASE_PASSWORD"];


if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

if (!DATABASE_HOST || !DATABASE_PORT) {
    logger.error("No database connection string. Set DATABASE_HOST and DATABASE_PORT environment variable.");
    process.exit(1);
}

if (!DATABASE_TYPE || !DATABASE_NAME) {
    logger.error("No database connection string. Set DATABASE_TYPE and DATABASE_NAME environment variable.");
    process.exit(1);
}

if (!DATABASE_USERNAME || !DATABASE_PASSWORD) {
    logger.error("No database credential. Set DATABASE_USERNAME and DATABASE_PASSWORD environment variable.");
    process.exit(1);
}


const databaseConfig: PostgresConnectionOptions = {
    type: DATABASE_TYPE as "postgres",
    host: DATABASE_HOST,
    port: +DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    entities: [
        __dirname + "/../entity/*.js"
    ],
    synchronize: true,
};

let conn: Connection = undefined;

export async function getConnection() {
    if (!conn) {
        conn = await createConnection(databaseConfig);
    }
    return conn;
}
