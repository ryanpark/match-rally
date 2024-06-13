import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId, MongoClientOptions } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, comments, userName, email } = req.body; // Include 'user' in the destructured request body

    // Validate input
    if (!userId || !comments || !userName || !email) {
      return res
        .status(400)
        .json({ message: "Missing userId, user, or comment" });
    }

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
      await client.connect();
      const database = client.db("TennisMatchFinder");
      const collection = database.collection("Events");

      // Use `$push` to add the comment object to an array field `comments`
      const result = await collection.updateOne(
        { _id: new ObjectId(userId) },
        {
          $push: {
            comments: { user: userName, comment: comments, email: email },
          },
        } // `$push` the comment into the `comments` array
      );

      if (result.matchedCount === 0) {
        return res
          .status(404)
          .json({ message: "User not found", user: "error" });
      }

      res
        .status(200)
        .json({ message: "Comment added successfully!", success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong!", error: true });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed!" });
  }
}
