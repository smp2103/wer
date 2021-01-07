"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _imageController = require("../controller/imageController");

var _middlewares = require("../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//수많은 라우트들이 담긴 파일
var imageRouter = _express["default"].Router(); //upload
// imageRouter.get(routes.uploadImage,getimageUpload);
// imageRouter.post(routes.uploadImage,uploadImage,postimageUpload)
//image Detail


var _default = imageRouter;
exports["default"] = _default;