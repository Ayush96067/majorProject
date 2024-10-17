import mongoose from "mongoose";
import connectDB from "./db/index.js";
import express from "express";
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

const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>HELLo<h1>`);
});

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`App listening at ${process.env.PORT}`);
});
