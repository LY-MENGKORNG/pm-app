import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const data = await auth.api.stopImpersonating({
    headers: await headers(),
  });

  return NextResponse.json(data)
}
