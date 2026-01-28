import { createUserSchema } from "@/db/schema/user";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bodyRaw = createUserSchema.parse(body);

    const newUser = await auth.api.createUser({
      body: {
        email: bodyRaw.email,
        password: bodyRaw.password,
        name: bodyRaw.name,
      },
      headers: await headers(),
    });

    return NextResponse.json(newUser);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error }, { status: 500 });
  }
}
