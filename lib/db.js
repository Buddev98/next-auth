import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect('mongodb+srv://nodeExpressProject:nodeExpressProject@nodeexpressprojects.ornto54.mongodb.net/')
  return client;
}