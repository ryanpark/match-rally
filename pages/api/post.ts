import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, MongoClientOptions } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, start, city, time, user, message, level, email } = req.body;

    const uri = process.env.MONGODB_URI;

    if (!uri) {
      return res.status(500).json({
        message: "Database connection string is missing!",
        error: true,
      });
    }

    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as MongoClientOptions);

    try {
      await client?.connect();
      const database = client?.db("TennisMatchFinder"); // Choose a name for your database

      const collection = database.collection("Events"); // Choose a name for your collection

      await collection.insertOne({
        title,
        start,
        city,
        time,
        user,
        message,
        level,
        email,
      });

      res
        .status(201)
        .json({ message: "Data saved successfully!", success: true });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!", error: true });
    } finally {
      await client?.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
