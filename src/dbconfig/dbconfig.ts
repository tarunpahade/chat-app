import { MongoClient } from "mongodb";
const uri=process.env.MONGODB_URL
const client = new MongoClient(uri!, {
    connectTimeoutMS: 30000,
  });
 
 const db = client.db("test");
  const Users = db.collection("users");
 export  const Messages = db.collection("messages");

export default Users     
