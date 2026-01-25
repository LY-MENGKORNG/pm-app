import { index, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";

export const project = pgTable("project", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  authorId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
},
  (table) => [index("project_author_idx").on(table.authorId)],
)
