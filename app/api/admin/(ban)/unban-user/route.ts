import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import { ZodError } from "zod";
import z from "zod/v4";

const unbanUserSchema = z.object({
  userId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bodyRaw = unbanUserSchema.parse(body);

    await auth.api.unbanUser({
      body: {
        userId: bodyRaw.userId,
      },
      headers: await headers(),
    });

    return NextResponse.json({ message: "User unbanned successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
