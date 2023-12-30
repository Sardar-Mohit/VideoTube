import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB() {
    console.log(DB_NAME)
    console.dir(process.env.MONGODB_URI, { depth: null });
  try {
    // CONNECTING DATABASE
    let connectionInstance = await mongoose.connect(`mongodb+srv://maherwanlundwani777:helloguys1.@cluster0.yymqkrw.mongodb.net/${DB_NAME}`);
    // DATABASE SUCCESSFULLY CONNECTED // It is used to see if i am connected to the correct db because there are multiple dbs in companies
    console.log(`\n DATABASE SUCCESSFULLY CONNECTED : ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log("DATABASE CONNECTION FAILED :" + error)
    process.exit(1)
  }
}

export default connectDB;
