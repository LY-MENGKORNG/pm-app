import db from "@/db"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins"

import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const ac = createAccessControl({
  ...defaultStatements,
  project: ["create", "update", "delete"],
})

export const auth = betterAuth({
  appName: "PM App",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  databaseHooks: {},
  plugins: [
    admin({
      ac,
      roles: {
        super_admin: ac.newRole({
          ...adminAc.statements,
          project: ["create", "update", "delete"],
        }),
        admin: ac.newRole({
          ...adminAc.statements,
          project: ["create", "update", "delete"],
        })
      },
      adminRoles: ["admin", "super_admin"],
    }),
    nextCookies()
  ]
})
