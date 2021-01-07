"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onlyPrivate = exports.onlyPublic = exports.localsMiddleware = exports.uploadImage = exports.uploadAvatar = exports.uploadVideo = void 0;

var _routes = _interopRequireDefault(require("./routes"));

var _multer = _interopRequireDefault(require("multer"));

var _multerS = _interopRequireDefault(require("multer-s3"));

var _awsSdk = _interopRequireDefault(require("aws-sdk"));

var _cookie = _interopRequireDefault(require("cookie"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var s3 = new _awsSdk["default"].S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});
var multerVideo = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: 'public-read',
    bucket: "rppproto/video"
  })
});
var multerAvatar = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: 'public-read',
    bucket: "rppproto/avatar"
  })
});
var multerImage = (0, _multer["default"])({
  storage: (0, _multerS["default"])({
    s3: s3,
    acl: 'public-read',
    bucket: "rppproto/image"
  })
});
var uploadVideo = multerVideo.single("videoFile");
exports.uploadVideo = uploadVideo;
var uploadAvatar = multerAvatar.single("avatar");
exports.uploadAvatar = uploadAvatar;
var uploadImage = multerImage.single("img");
exports.uploadImage = uploadImage;

var localsMiddleware = function localsMiddleware(req, res, next) {
  res.locals.siteName = "WERO";
  res.locals.routes = _routes["default"];
  res.locals.loggedUser = req.user || null;
  next();
};

exports.localsMiddleware = localsMiddleware;

var onlyPublic = function onlyPublic(req, res, next) {
  if (req.user) {
    res.redirect(_routes["default"].home);
    console.log("from onlyPublic");
  } else {
    next();
  }
};

exports.onlyPublic = onlyPublic;

var onlyPrivate = function onlyPrivate(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.redirect(_routes["default"].home);
    console.log("from only Private");
  }
}; //


exports.onlyPrivate = onlyPrivate;