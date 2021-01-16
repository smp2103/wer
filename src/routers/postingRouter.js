// 게시판 관련 ( 안쓰는게 대다수)
import express from "express";
import routes from "../routes";
import { getPosting, postDetail, deletePosting, getPostingAuthorization, postPostingAuthorization, deleteGift, getPostingComments, postAddComment } from "../controller/postingController";
import { posting, home, getNewUpload, postNewUpload, postUpload, videoDetail, getEditVideo, postEditVideo, deleteVideo } from "../controller/videoController";
import { uploadVideo, uploadImage, onlyPrivate } from "../middlewares";
import { getimageUpload, getImageUpload, postImageUpload, imageDetail, postEditImage, getEditImage, deleteImage } from "../controller/imageController";

const postingRouter  = express.Router();


postingRouter.get(routes.posting,home); 

postingRouter.get(routes.postingAuthorize,getPostingAuthorization);
postingRouter.post(routes.postingAuthorize,postPostingAuthorization);

postingRouter.get(routes.postDetail(),onlyPrivate,postDetail) 
postingRouter.post(routes.postDetail(),postAddComment);
postingRouter.get(routes.deletePosting(), onlyPrivate, deletePosting);


// 선물 상세내용
// To Do : 오직, key를 발급받은사람만 주는 callback function 구현
postingRouter.get(`${routes.postDetail()}${routes.videoDetail()}`,onlyPrivate,videoDetail)
postingRouter.get(`${routes.postDetail()}${routes.upload}`,onlyPrivate,getNewUpload)
postingRouter.post(`${routes.postDetail()}${routes.upload}`,onlyPrivate,uploadVideo,postUpload)
postingRouter.get(`${routes.postDetail()}${routes.editVideo()}`,getEditVideo)
postingRouter.post(`${routes.postDetail()}${routes.editVideo()}`,postEditVideo)
postingRouter.get(`${routes.postDetail()}${routes.deleteVideo()}`,deleteVideo)

postingRouter.get(`${routes.postDetail()}${routes.imageDetail()}`,imageDetail)
postingRouter.get(`${routes.postDetail()}${routes.uploadImage}`,onlyPrivate,getImageUpload)
postingRouter.post(`${routes.postDetail()}${routes.uploadImage}`,onlyPrivate,uploadImage,postImageUpload)
postingRouter.get(`${routes.postDetail()}${routes.editImage()}`,getEditImage)
postingRouter.post(`${routes.postDetail()}${routes.editImage()}`,postEditImage)
postingRouter.get(`${routes.postDetail()}${routes.deleteImage()}`,deleteImage)



// webgift 삭제










export default postingRouter;

