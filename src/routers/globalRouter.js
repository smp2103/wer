import express from "express";
import routes from "../routes";
import { home, search, posting } from "../controller/videoController";
import { logout, getJoin, postJoin, getLogin, postLogin, githubLogin, githubLoginCallback, postGitHubLogIn, getMe, message } from "../controller/userController";
import {onlyPublic, uploadImage,  onlyPrivate} from "../middlewares"
import passport from "passport"
import { getPosting, getDirection, getPost, postPost, getMuser, getFMuser, getCommunity  } from "../controller/postingController";
import { postImageUpload } from "../controller/imageController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getMuser);
globalRouter.get(routes.fmhome, getFMuser);
globalRouter.get(routes.community, getCommunity);
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login,onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);   
globalRouter.get(routes.search, search);

globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(routes.githubCallback,
    passport.authenticate('github',{failureRedirect:"/login"}),
    postGitHubLogIn);

globalRouter.get(routes.me, getMe);
globalRouter.get(routes.direction,getDirection)

globalRouter.get(routes.newGift,getPost)
globalRouter.post(routes.newGift,postPost)






export default globalRouter;