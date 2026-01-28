import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import z, { ZodError } from "zod/v4";

const setUserPasswordSchema = z.object({
  newPassword: z.string(),
  userId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bodyRaw = setUserPasswordSchema.parse(body);

    const data = await auth.api.setUserPassword({
      body: {
        newPassword: bodyRaw.newPassword,
        userId: bodyRaw.userId,
      },
      headers: await headers(),
    });

    return NextResponse.json(data);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
