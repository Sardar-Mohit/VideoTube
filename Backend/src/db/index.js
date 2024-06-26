import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

async function connectDB() {
  try {
    // CONNECTING DATABASE
    let connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    // DATABASE SUCCESSFULLY CONNECTED // It is used to see if i am connected to the correct db because there are multiple dbs in companies
    console.log(`\nDATABASE SUCCESSFULLY CONNECTED : ${connectionInstance.connection.host}`)
  } catch (error) {
    console.log("DATABASE CONNECTION FAILED :" + error)
    process.exit(1)
  }
}

export default connectDB;
