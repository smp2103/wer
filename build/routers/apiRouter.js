"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("../routes"));

var _postingController = require("../controller/postingController");

var _userController = require("../controller/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//수많은 라우트들이 담긴 파일
var apiRouter = _express["default"].Router();

apiRouter.post(_routes["default"].addLike, _postingController.like);
apiRouter.post(_routes["default"].filter, _userController.filtering);
var _default = apiRouter;
exports["default"] = _default;