import "@babel/polyfill"
import dotenv from "dotenv";
import "./db"
import app from "./app";
import passportLocalMongoose from "passport-local-mongoose";

dotenv.config();

import "./models/Video";
import "./models/Comment";
import "./models/User";
const PORT = process.env.PORT || 8001;
const MONGO_URL = process.env.MONGO_URL

const handleListening = () => console.log(`${MONGO_URL}:${PORT}`);

app.listen(PORT,handleListening);