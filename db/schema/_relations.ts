import { defineRelations } from "drizzle-orm"
import { user } from "./user"
import { session } from "./session"
import { account } from "./account"
import { verification } from "./verification"
import { project } from "./project"

export const schema = { user, session, account, verification, project }

export default defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
    projects: r.many.project(),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id
    })
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id
    })
  },
  project: {
    author: r.one.user({
      from: r.project.authorId,
      to: r.user.id
    })
  },
  verification: {},
}))
