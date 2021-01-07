//수많은 라우트들이 담긴 파일
import express from "express";
import routes from "../routes";
import { postAddComment, postImageData, openModal, like } from "../controller/postingController";
import { filtering } from "../controller/userController";


const apiRouter  = express.Router();


apiRouter.post(routes.addLike, like);
apiRouter.post(routes.filter, filtering);

export default apiRouter;
