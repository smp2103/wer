import passport from "passport";
import User from "./models/User";
import GithubStrategy from "passport-github"
import { githubLoginCallback } from "./controller/userController";
import routes from "./routes";
import dotenv from "dotenv"
dotenv.config();
const MONGO_URL = process.env.MONGO_URL

passport.use(User.createStrategy());

passport.use(new GithubStrategy({
    clientID: process.env.GH_ID,
    clientSecret: process.env.GH_SECRET,
    // heroku Github
    callbackURL: `https://stormy-taiga-39906.herokuapp.com${routes.githubCallback}` 
    // local Github
    // callbackURL: `http://localhost:4000${routes.githubCallback}`
    },githubLoginCallback)

);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());