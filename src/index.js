import mongoose from "mongoose";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();

// whenever communicate with database, always use try catch (database is always in another continent)

// Method 1 : Db connection (using IFFI)
/* 
import express from "express";
const app = express();
(async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);
    app.on("error", (err) => {
      console.log("ERROR: ", err);
      throw err;
    });

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });

  } catch (err) {
    console.log("ERROR : ", err);
  }
})();
*/

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Mongo db connection failed !!! `, err);
  });
