import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import z, { ZodError } from "zod/v4";

const updateUserSchema = z.object({
  userId: z.string(),
  data: z.object({
    name: z.string().min(3).max(50).trim().optional(),
    email: z.email().trim().optional(),
    role: z.enum(["admin", "super_admin"]).optional(),
  }),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const bodyRaw = updateUserSchema.parse(body);

    if (Object.keys(bodyRaw.data).length === 0) {
      return NextResponse.json({ error: "No data to update" }, { status: 400 });
    }

    const data = await auth.api.adminUpdateUser({
      body: bodyRaw,
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