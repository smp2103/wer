"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PostSchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  updatedAt: {
    type: Date
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  },
  like: {
    type: Number
  },
  like_created: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }],
  creatorName: {
    type: String
  },
  videos: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Video"
  }],
  images: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Image"
  }],
  comments: [],
  questions: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Question"
  }]
});

var model = _mongoose["default"].model("Post", PostSchema);

var _default = model;
exports["default"] = _default;