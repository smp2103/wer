//수많은 라우트들이 담긴 파일
import express from "express";
import routes from "../routes";
import { getimageUpload, postimageUpload, imageDetail } from "../controller/imageController";
import { uploadImage } from "../middlewares";



const imageRouter  = express.Router();

//upload
// imageRouter.get(routes.uploadImage,getimageUpload);
// imageRouter.post(routes.uploadImage,uploadImage,postimageUpload)
//image Detail





export default imageRouter;
