import express from "express";
import routes from "../routes";
import { home, search, posting } from "../controller/videoController";
import { logout, getJoin, postJoin, getLogin, postLogin, githubLogin, githubLoginCallback, postGitHubLogIn, getMe, message, getFJoin, postFJoin, kakao, likeUser, deleteUser, loginTest } from "../controller/userController";
import {onlyPublic, uploadImage,  onlyPrivate} from "../middlewares"
import passport from "passport"
import { getPosting, getDirection, getPost, postPost, getMuser, getFMuser, getCommunity, getLove, getLoveLove, getNotice  } from "../controller/postingController";
import { postImageUpload } from "../controller/imageController";
import { pagingController } from "../controller/pageController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getCommunity);

globalRouter.get(routes.male, getMuser)

globalRouter.get(routes.fmhome, getFMuser);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.fjoin, onlyPublic, getFJoin)
globalRouter.post(routes.fjoin, onlyPublic,postFJoin, postLogin);
globalRouter.get(routes.newGift, getPost)

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
globalRouter.get(routes.likeUser, likeUser);

globalRouter.get(routes.deleteUser,deleteUser)

globalRouter.get(routes.test,pagingController)
globalRouter.get(routes.love,getLove)
globalRouter.get(routes.lovelove,getLoveLove)

globalRouter.get(routes.logintest,loginTest)

globalRouter.get(routes.notice, getNotice)






export default globalRouter;