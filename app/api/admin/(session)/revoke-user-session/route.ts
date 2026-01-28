import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import z from "zod/v4";

const revokeUserSessionSchema = z.object({
  sessionToken: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const bodyRaw = revokeUserSessionSchema.safeParse(body)

    if (!bodyRaw.success) {
      return NextResponse.json({ error: bodyRaw.error }, { status: 400 });
    }

    const data = await auth.api.revokeUserSession({
      body: {
        sessionToken: bodyRaw.data.sessionToken,
      },
      headers: await headers(),
    });

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
