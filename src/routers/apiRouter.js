//수많은 라우트들이 담긴 파일
import express from "express";
import routes from "../routes";
import { postAddComment, postImageData, openModal, like, postlike, deletePosting } from "../controller/postingController";
import { filtering, sendMbtiUserData, sendUserData } from "../controller/userController";


const apiRouter  = express.Router();


apiRouter.get(routes.userData, sendUserData)
apiRouter.post(routes.postlike, postlike)
apiRouter.post(routes.addLike, like);
apiRouter.post(routes.filter, filtering);
apiRouter.post(routes.postDelete,deletePosting)

export default apiRouter;
