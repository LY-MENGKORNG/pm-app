import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod/v4";

const banUserSchema = z.object({
  userId: z.string(),
  banReason: z.string(),
  banExpiresIn: z.number().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bodyRaw = banUserSchema.parse(body);

    await auth.api.banUser({
      body: {
        userId: bodyRaw.userId,
        banReason: bodyRaw.banReason,
        banExpiresIn: bodyRaw?.banExpiresIn || 60 * 60 * 24 * 7,
      },
      headers: await headers(),
    });

    return NextResponse.json({ message: "User banned successfully" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
