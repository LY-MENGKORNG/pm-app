import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const menu = pgTable("menu", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  icon: text("icon"),
  description: text("description"),
})
