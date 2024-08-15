import { NextApiRequest, NextApiResponse } from "next"; // Assuming Next.js is used
import { login } from "@/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const formData = new FormData();
      formData.append("email", req.body.email); // Assuming req.body is already parsed
      await login(formData);
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "Login failed" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
