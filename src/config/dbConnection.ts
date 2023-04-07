import mongoose from "mongoose";
import { Helper } from "../classes/Helper";

export const setupDBConnection =  () => {
   mongoose.connect(
    "mongodb+srv://nine-pay:ninepay%409tab.in@cluster0.34qgi.mongodb.net"
  );
  const db =  mongoose.connection;
  db.on("error", console.error.bind(console, "connection error: "));
  db.once("open", () => {
    console.log("Database connection established successfully");

  });
};
mongoose.set("strictQuery", true)
