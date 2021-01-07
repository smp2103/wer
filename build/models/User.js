"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _passportLocalMongoose = _interopRequireDefault(require("passport-local-mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

require('mongoose-type-url');

var UserSchema = new _mongoose["default"].Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number,
  sex: String,
  mbti: String,
  description: String,
  link: String,
  univ: String,
  age: String,
  like: {
    type: Number,
    "default": 0
  },
  like_created: [{
    type: _mongoose["default"].Schema.Types.ObjectId
  }],
  comments: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Comment"
  }],
  videos: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Video"
  }],
  images: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Image"
  }],
  posts: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Post"
  }]
});
UserSchema.plugin(_passportLocalMongoose["default"], {
  usernameField: 'email'
});

var model = _mongoose["default"].model("User", UserSchema);

var _default = model;
exports["default"] = _default;