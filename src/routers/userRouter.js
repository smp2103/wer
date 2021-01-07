//수많은 라우트들이 담긴 파일
import express from "express";
import routes from "../routes";
import { changePassword, userDetail, getEditProfile, postEditProfile, getChangePassword, postChangePassword, message } from "../controller/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter  = express.Router();


userRouter.get(routes.editProfile,onlyPrivate,getEditProfile);
userRouter.post(routes.editProfile,onlyPrivate,uploadAvatar,postEditProfile);
userRouter.get(routes.changePassword,onlyPrivate,getChangePassword);
userRouter.post(routes.changePassword,onlyPrivate,postChangePassword);
userRouter.get(routes.userDetail(),userDetail);




export default userRouter;

