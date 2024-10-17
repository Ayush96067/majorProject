import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

//  MIDDLEWARES : used to check for certain conditions before performing some tasks

// cross origin middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// limit for getting json so that to prevent server crash
app.use(express.json({ limit: "16kb" }));

// For url data
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);

// storing files or images in public folder assets
app.use(express.static("public"));

// use to access or set cookies from user browser from my server
app.use(cookieParser());

export { app };
