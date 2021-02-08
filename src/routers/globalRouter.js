// ykring.site/*



import express from "express";
import routes from "../routes";
import { home, search, posting } from "../controller/videoController";
import { logout, getJoin, postJoin, getLogin, postLogin, githubLogin, githubLoginCallback, postGitHubLogIn, getMe, message, getFJoin, postFJoin, kakao, likeUser, deleteUser, loginTest, postSearch, filtering, getNewJoin } from "../controller/userController";
import {onlyPublic, uploadImage,  onlyPrivate} from "../middlewares"
import passport from "passport"
import { getPosting, getDirection, getPost, postPost, getMuser, getFMuser, getCommunity, getLove, getLoveLove, getNotice, postMuser  } from "../controller/postingController";
import { postImageUpload } from "../controller/imageController";
import { pagingController, pagingController2 } from "../controller/pageController";

const globalRouter = express.Router();

globalRouter.get(routes.home, getCommunity);

// globalRouter.get(routes.male, getMuser)
globalRouter.post(routes.male, postMuser);

globalRouter.get(routes.fmhome, getFMuser);

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);
globalRouter.get(routes.fjoin, onlyPublic, getFJoin)
globalRouter.post(routes.fjoin, onlyPublic,uploadImage,postFJoin, postLogin);
globalRouter.get(routes.newGift, getPost)

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login,onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);   
globalRouter.get(routes.search, search);
globalRouter.get(routes.newjoin, getNewJoin)
globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(routes.githubCallback,
    passport.authenticate('github',{failureRedirect:"/login"}),
    postGitHubLogIn);

globalRouter.get(routes.me,onlyPrivate, getMe);
globalRouter.get(routes.direction,getDirection)

globalRouter.get(routes.newGift,getPost)
globalRouter.post(routes.newGift,uploadImage,postPost)
globalRouter.get(routes.likeUser, likeUser);



globalRouter.get(routes.test,pagingController)
globalRouter.get(routes.test2,pagingController2)
globalRouter.get(routes.love,getLove)
globalRouter.get(routes.lovelove,getLoveLove)

globalRouter.get(routes.logintest,loginTest)

globalRouter.get(routes.notice, getNotice)
globalRouter.post(routes.search,postSearch)







export default globalRouter;