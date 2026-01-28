import { ROLES } from "@/constants/role";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import z from "zod/v4";

const updateRoleSchema = z.object({
  userId: z.string(),
  role: z.enum(ROLES),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const bodyRaw = updateRoleSchema.parse(body);

  const data = await auth.api.setRole({
    body: {
      userId: bodyRaw.userId,
      role: bodyRaw.role,
    },
    headers: await headers(),
  });
  return NextResponse.json(data);
}
