"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//Global
var HOME = "/";
var JOIN = "/join";
var LOGIN = "/login";
var LOGOUT = "/logout";
var SEARCH = "/search";
var FMHOME = "/fmhome"; //Users

var USERS = "/users";
var EDIT_PROFILE = "/edit-profile";
var CHANGE_PASSWORD = "/change-password";
var USER_DETAIL = "/:id";
var ME = "/me";
var MESSAGE = "/message"; //VIdeos

var VIEDOS = "/videos";
var VIDEO_DETAIL = "/:id";
var EDIT_VIDEO = "/:id/edit-video";
var DELETE_VIDEO = "/:id/delete-video";
var UPLOAD = "/upload-video"; //API

var API = "/api"; // const ADD_LIKE = "/:id/like"

var ADD_LIKE = "/like";
var FILTER = "/filter";
var TEST = "/:id/test";
var REMOVE_COMMENT = "/:id/remove";
var POST_IMAGEDATA = "/:id/postImageData"; //Github

var GITHUB = "/auth/github";
var GITHUB_CALLBACK = "/auth/github/callback"; //image

var IMAGE = "/img";
var UPLOAD_IMG = "/upload-image";
var IMAGE_DETAIL = "/:id";
var EDIT_IMAGE = "/:id/edit-image";
var DELETE_IMAGE = "/:id/delete-image"; //Post

var POSTING = "/posting";
var POSTING_DETAIL = "/:id";
var NEW_GIFT = "/newGift";
var DELETE_POSTING = "/:id/delete-posting";
var POSTING_AUTH = "/authorize";
var DELETE_GIFT = "/:id/deleteGift"; //mainpage

var DIRECTION = "/direction"; // letter

var POSTING_COMMENTS = "/posting-comments"; // community

var COMMUNITY = "/community";
var routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  users: USERS,
  me: ME,
  fmhome: FMHOME,
  community: COMMUNITY,
  filter: FILTER,
  userDetail: function userDetail(id) {
    if (id) {
      return "/users/".concat(id);
    } else {
      return USER_DETAIL;
    }
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  videos: VIEDOS,
  upload: UPLOAD,
  videoDetail: function videoDetail(id) {
    if (id) {
      return "/".concat(id);
    } else {
      return VIDEO_DETAIL;
    }
  },
  imageDetail: function imageDetail(id) {
    if (id) {
      return "/".concat(id);
    } else {
      return IMAGE_DETAIL;
    }
  },
  postDetail: function postDetail(id) {
    if (id) {
      return "/posting/".concat(id);
    } else {
      return POSTING_DETAIL;
    }
  },
  editVideo: function editVideo(id) {
    if (id) {
      return "".concat(id, "/edit-video");
    } else {
      return EDIT_VIDEO;
    }
  },
  editImage: function editImage(id) {
    if (id) {
      return "".concat(id, "/edit-image");
    } else {
      return EDIT_IMAGE;
    }
  },
  deleteVideo: function deleteVideo(id) {
    if (id) {
      return "/".concat(id, "/delete-video");
    } else {
      return DELETE_VIDEO;
    }
  },
  deleteImage: function deleteImage(id) {
    if (id) {
      return "/".concat(id, "/delete-image");
    } else {
      return DELETE_IMAGE;
    }
  },
  deletePosting: function deletePosting(id) {
    if (id) {
      return "/".concat(id, "/delete-posting");
    } else {
      return DELETE_POSTING;
    }
  },
  deleteGift: function deleteGift(id) {
    if (id) {
      return "/posting/".concat(id, "/delete-Gift");
    } else {
      return DELETE_GIFT;
    }
  },
  gitHub: GITHUB,
  githubCallback: GITHUB_CALLBACK,
  api: API,
  image: IMAGE,
  uploadImage: UPLOAD_IMG,
  addLike: ADD_LIKE,
  removeComment: REMOVE_COMMENT,
  message: MESSAGE,
  posting: POSTING,
  direction: DIRECTION,
  newGift: NEW_GIFT,
  postingAuthorize: POSTING_AUTH,
  postingComments: POSTING_COMMENTS,
  postImageData: POST_IMAGEDATA,
  test: TEST
};
var _default = routes;
exports["default"] = _default;