import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core"
import z from "zod/v4";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned").default(false),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
});

export const createUserSchema = z.object({
  name: z.string().min(3).max(50).trim(),
  email: z.email().trim(),
  password: z.string().min(8).trim(),
})
