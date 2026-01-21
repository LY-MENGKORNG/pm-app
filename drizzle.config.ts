import { defineConfig } from "drizzle-kit"

export default defineConfig({
  dialect: "postgresql",
  casing: "snake_case",
  schema: "db/schema/*",
  out: "db/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  }
})
