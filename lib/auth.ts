import { ROLES } from "@/constants/role";
import db from "@/db"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js";
import { organization, admin } from "better-auth/plugins"

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
    organization({
      allowUserToCreateOrganization(user) {
        return ROLES.includes(user.role)
      },
      organizationHooks: {
        /** @description Organization hooks */
        async beforeCreateOrganization({ organization, user }) { },
        async afterCreateOrganization({ organization, member, user }) { },
        async beforeUpdateOrganization({ organization, member, user }) { },
        async afterUpdateOrganization({ organization, member, user }) { },
        async beforeDeleteOrganization({ organization, user }) { },

        /** @description Member hooks */
        async beforeAddMember({ organization, member, user }) { },
        async afterAddMember({ organization, member, user }) { },
        async beforeRemoveMember({ organization, member, user }) { },
        async afterRemoveMember({ organization, member, user }) { },
        async beforeUpdateMemberRole({ organization, member, user, newRole }) { },
        async afterUpdateMemberRole({ organization, member, user, previousRole }) { },

        /** @description Invitation hooks */
        async beforeCreateInvitation({ organization, invitation, inviter }) { },
        async afterCreateInvitation({ organization, invitation, inviter }) { },
        async beforeAcceptInvitation({ organization, invitation, user }) { },
        async afterAcceptInvitation({ organization, invitation, member, user }) { },
        async beforeRejectInvitation({ organization, invitation, user }) { },
        async afterRejectInvitation({ organization, invitation, user }) { },
        async beforeCancelInvitation({ organization, invitation, cancelledBy }) { },
        async afterCancelInvitation({ organization, invitation, cancelledBy }) { },

        /** @description Team hooks  */
        async beforeCreateTeam({ organization, team, user }) { },
        async afterCreateTeam({ organization, team, user }) { },
        async beforeUpdateTeam({ organization, team, user, updates }) { },
        async afterUpdateTeam({ organization, team, user }) { },
        async beforeDeleteTeam({ organization, team, user }) { },
        async afterDeleteTeam({ organization, team, user }) { },
        async beforeAddTeamMember({ organization, team, user, teamMember }) { },
        async afterAddTeamMember({ organization, team, user, teamMember }) { },
        async beforeRemoveTeamMember({ organization, team, user, teamMember }) { },
        async afterRemoveTeamMember({ organization, team, user, teamMember }) { },
      }
    }),
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
