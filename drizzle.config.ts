import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config(); // Ensure .env is loaded

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required. Set it to your PostgreSQL connection string (e.g., postgresql://user:password@host:port/database)");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql", // ✅ switch from "mysql" to "postgresql"
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
