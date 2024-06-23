import { NextResponse } from "next/server";
import { connectToDB } from "@utils/database";

export async function GET() {
  await connectToDB();
  return NextResponse.json({ message: "User endpoint is working!" });
}
