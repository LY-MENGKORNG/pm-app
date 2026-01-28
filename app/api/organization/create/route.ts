import { auth } from "@/lib/auth";
import { SendError } from "@/lib/helper/http";
import { headers } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";
import z from "zod/v4";

const createOrgSchema = z.object({
  name: z.string().min(3).max(50),
  slug: z.string().min(3).max(50),
  logo: z.string(),
  metadata: z.object({
    description: z.string().max(100),
    tags: z.array(z.string()).max(5),
  }),
  userId: z.string(),
  keepCurrentActiveOrganization: z.boolean().default(false),
})

export async function POST(request: NextRequest) {

  try {
    const body = await request.json();

    const bodyRaw = createOrgSchema.safeParse(body);

    if (!bodyRaw.success) {
      return Response.json({ error: bodyRaw.error.issues }, { status: 400 });
    }

    const data = await auth.api.createOrganization({
      body: bodyRaw.data,
      headers: await headers(),
    });

    return NextResponse.json(data);
  } catch (error) {
    return SendError(error)
  }
}
