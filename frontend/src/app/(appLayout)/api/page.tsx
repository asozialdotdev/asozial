import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { _id } = req.body;

    // Save the _id to your database or session
    // Example: Save to session
    // req.session.userId = _id;
    // await req.session.save();

    res.status(200).json({ message: "ID saved successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
