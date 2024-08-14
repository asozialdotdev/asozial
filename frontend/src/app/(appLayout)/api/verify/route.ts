"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const request = await req.json();
  const body = JSON.parse(request.body);
  const { _id, username, avatarUrl } = body;
  const accessToken = request.headers["authorization"]?.split(" ")[1];

  try {
    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "lax",
    });
    cookies().set("user", _id, {
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    return NextResponse.json({ message: "Cookies set" });
  } catch (error: any) {
    console.error("Failed to set cookies");
    console.log(error.message);
    return NextResponse.json({ message: "Failed to set cookies" });
  }
}
