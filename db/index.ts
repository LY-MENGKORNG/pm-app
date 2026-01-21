import { drizzle } from "drizzle-orm/postgres-js";
import relations from "./schema/_relations";

const db = drizzle({ relations, connection: { url: process.env.DATABASE_URL! } })

export default db
