import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const users = await auth.api.listUsers({
    query: {
      searchValue: searchParams.get("search") || "",
      searchField: "name",
      searchOperator: "contains",
      filterValue: searchParams.get("role") || "",
      filterField: "role",
      filterOperator: "eq",
    },
    headers: await headers(),
  });

  return NextResponse.json(users);
}