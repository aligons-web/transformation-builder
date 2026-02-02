import { config } from "dotenv";
config();
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const DATABASE_URL = process.env.RAILWAY_DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error(
    "Missing RAILWAY_DATABASE_URL environment variable. " +
    "Set it to your Railway PostgreSQL public connection string."
  );
}

export const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export const db = drizzle(pool);
