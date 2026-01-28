import db from "@/db";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  db.query.project.findMany(

  )
}
