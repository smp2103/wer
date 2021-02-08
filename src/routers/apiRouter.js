// axios 처리 하는 라우트
import express from "express";
import routes from "../routes";
import { postAddComment, postImageData, openModal, like, postlike, deletePosting } from "../controller/postingController";
import { filtering, sendMbtiUserData, sendUserData } from "../controller/userController";


const apiRouter  = express.Router();


apiRouter.get(routes.userData, sendUserData)
apiRouter.post(routes.postlike, postlike)
apiRouter.post(routes.addLike, like);

apiRouter.post(routes.postDelete,deletePosting)

export default apiRouter;
