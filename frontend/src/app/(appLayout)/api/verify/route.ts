"use server";

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { encrypt } from "@/lib/lib";

export async function POST(req: NextRequest) {
  const request = await fetch("http://localhost:5005/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Cookie: cookies().toString(),
    },
  });

  const { _id, username, image } = await request.json();
  console.log("User details//////:", _id, username, image);

  const expires = new Date(Date.now() + 3600 * 1000);
  const session = await encrypt({ _id, expires });
  const response = NextResponse.json({ _id });
  response.cookies.set("session", session, {
    expires,
    httpOnly: true,
    sameSite: "none",
    secure: false,
    path: "/", // Set cookie for the entire site
  });
  // console.log("Session cookie set:", session);
  console.log("Cookie", response.cookies);
  console.log("Response:", response);
  return response;
}
