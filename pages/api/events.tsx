import clientPromise from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = await clientPromise;
    const db = client.db("TennisMatchFinder"); // Access the correct database
    const users = await db
      .collection("Users") // Access the correct collection
      .find({}) // Assuming "metacritic" field exists in "Users" collection
      .limit(10)
      .toArray();

    res.json(users);
  } catch (e) {
    console.error(e);
  }
};
