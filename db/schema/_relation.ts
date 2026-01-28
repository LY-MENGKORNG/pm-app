import { defineRelations } from "drizzle-orm"
import { user } from "./user"
import { session } from "./session"
import { account } from "./account"
import { verification } from "./verification"
import { project } from "./project"
import { menu } from "./menu"
import { organization } from "./organization"
import { member } from "./member"
import { invitation } from "./invitation"

export const schema = { user, session, account, verification, project, menu, organization, member, invitation }

export default defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
    projects: r.many.project(),
    members: r.many.member(),
    invitations: r.many.invitation(),
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
    }),
    organization: r.one.organization({
      from: r.project.organizationId,
      to: r.organization.id
    })
  },
  organization: {
    members: r.many.member(),
    invitations: r.many.invitation(),
    projects: r.many.project(),
  },
  member: {
    organization: r.one.organization({
      from: r.member.organizationId,
      to: r.organization.id
    }),
    user: r.one.user({
      from: r.member.userId,
      to: r.user.id
    })
  },
  invitation: {
    organization: r.one.organization({
      from: r.invitation.organizationId,
      to: r.organization.id
    }),
    inviter: r.one.user({
      from: r.invitation.inviterId,
      to: r.user.id
    })
  },
  verification: {},
  menu: {},
}))
