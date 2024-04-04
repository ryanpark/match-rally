// pages/api/saveData.js
import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { title, start, city, time, user, message, level } = req.body;

    const client = new MongoClient(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      await client.connect();
      const database = client.db("TennisMatchFinder"); // Choose a name for your database

      const collection = database.collection("Events"); // Choose a name for your collection

      await collection.insertOne({
        title,
        start,
        city,
        time,
        user,
        message,
        level,
      });

      res.status(201).json({ message: "Data saved successfully!" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong!" });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
