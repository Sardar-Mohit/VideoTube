import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
dotenv.config({ path: "./.env" });
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

connectDB()

  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log("Server is running at :" + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION FAILED : " + error);
  });
