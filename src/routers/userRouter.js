// My탭 
import express from "express";
import routes from "../routes";
import { changePassword, userDetail, getEditProfile, postEditProfile, getChangePassword, postChangePassword, message, likeUser, getAlbumUpload, postAlbumUpload, getAlbumDelete, postAlbumDelete, deleteUser } from "../controller/userController";
import { onlyPrivate, uploadAvatar, uploadImage } from "../middlewares";
import { getLove } from "../controller/postingController";

const userRouter  = express.Router();


userRouter.get(routes.editProfile,onlyPrivate,getEditProfile);
userRouter.post(routes.editProfile,onlyPrivate,uploadAvatar,postEditProfile);
userRouter.get(routes.changePassword,onlyPrivate,getChangePassword);
userRouter.post(routes.changePassword,onlyPrivate,postChangePassword);
userRouter.get(routes.userDetail(),userDetail);
userRouter.get(`${routes.userDetail()}${routes.album}`,getAlbumUpload)
userRouter.post(`${routes.userDetail()}${routes.album}`,onlyPrivate,uploadImage,postAlbumUpload)
userRouter.get(`${routes.userDetail()}${routes.albumDelete}`, getAlbumDelete)
userRouter.post(`${routes.userDetail()}${routes.albumDelete}`, postAlbumDelete)
userRouter.post(routes.deleteUser,deleteUser)



export default userRouter;

