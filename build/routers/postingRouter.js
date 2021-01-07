"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _postingController = require("../controller/postingController");

var _videoController = require("../controller/videoController");

var _middlewares = require("../middlewares");

var _imageController = require("../controller/imageController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//수많은 라우트들이 담긴 파일
var postingRouter = _express["default"].Router();

postingRouter.get(_routes["default"].posting, _videoController.home); // 선물함 

postingRouter.get(_routes["default"].postingAuthorize, _postingController.getPostingAuthorization);
postingRouter.post(_routes["default"].postingAuthorize, _postingController.postPostingAuthorization);
postingRouter.get(_routes["default"].postDetail(), _middlewares.onlyPrivate, _postingController.postDetail); // 진행중인 선물 >>

postingRouter.get(_routes["default"].deletePosting(), _middlewares.onlyPrivate, _postingController.deletePosting); // 선물 상세내용
// To Do : 오직, key를 발급받은사람만 주는 callback function 구현

postingRouter.get("".concat(_routes["default"].postDetail()).concat(_routes["default"].videoDetail()), _middlewares.onlyPrivate, _videoController.videoDetail);
postingRouter.get("".concat(_routes["default"].postDetail()).concat(_routes["default"].upload), _middlewares.onlyPrivate, _videoController.getNewUpload);
postingRouter.post("".concat(_routes["default"].postDetail()).concat(_routes["default"].upload), _middlewares.onlyPrivate, _middlewares.uploadVideo, _videoController.postUpload);
postingRouter.get("".concat(_routes["default"].postDetail()).concat(_routes["default"].editVideo()), _videoController.getEditVideo);
postingRouter.post("".concat(_routes["default"].postDetail()).concat(_routes["default"].editVideo()), _videoController.postEditVideo);
postingRouter.get("".concat(_routes["default"].postDetail()).concat(_routes["default"].deleteVideo()), _videoController.deleteVideo);
postingRouter.get("".concat(_routes["default"].postDetail()).concat(_routes["default"].imageDetail()), _imageController.imageDetail);
postingRouter.get("".concat(_routes["default"].postDetail()).concat(_routes["default"].uploadImage), _middlewares.onlyPrivate, _imageController.getImageUpload);
postingRouter.post("".concat(_routes["default"].postDetail()).concat(_routes["default"].uploadImage), _middlewares.onlyPrivate, _middlewares.uploadImage, _imageController.postImageUpload);
postingRouter.get("".concat(_routes["default"].postDetail()).concat(_routes["default"].editImage()), _imageController.getEditImage);
postingRouter.post("".concat(_routes["default"].postDetail()).concat(_routes["default"].editImage()), _imageController.postEditImage);
postingRouter.get("".concat(_routes["default"].postDetail()).concat(_routes["default"].deleteImage()), _imageController.deleteImage); // webgift 삭제

var _default = postingRouter;
exports["default"] = _default;