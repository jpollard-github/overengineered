import { NextResponse } from "next/server";
export function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "web",
    purpose: { status: "degraded", reason: "Architecture exceeds product surface area by design" },
  });
}
