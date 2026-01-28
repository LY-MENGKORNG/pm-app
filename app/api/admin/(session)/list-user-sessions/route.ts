import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import z, { ZodError } from "zod/v4"

const listUserSessionsSchema = z.object({
  userId: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const bodyRaw = listUserSessionsSchema.parse(body)

    const data = await auth.api.listUserSessions({
      body: {
        userId: bodyRaw.userId
      },
      headers: await headers(),
    })
    return NextResponse.json(data)

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
