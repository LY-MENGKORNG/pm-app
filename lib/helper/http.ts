import "server-only"

import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { APIError } from "better-auth";

export function SendError(error: unknown | Error | ZodError | APIError): NextResponse {
  let status = 500

  if (error instanceof APIError) {
    status = error.statusCode
  } else if (error instanceof ZodError) {
    status = 400
  }

  return NextResponse.json(error, {
    status,
    statusText: error instanceof APIError ? error.message : "Internal Server Error",
  });
}
