import { drizzle } from "drizzle-orm/postgres-js"
import relations, { schema } from "./schema/_relation"
// import { SQL } from "bun"

// const client = new SQL({ url: process.env.DATABASE_URL! })
const db = drizzle({
  relations,
  schema,
  connection: { url: process.env.DATABASE_URL! }
  // client,
})

export default db
