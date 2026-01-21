import { defineRelations } from "drizzle-orm";
import { user } from "./user";
import { session } from "./session";
import { account } from "./account";
import { verification } from "./verification";

export const schema = { user, session, account, verification }

export default defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session(),
    accounts: r.many.account()
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
  verification: {}
}))