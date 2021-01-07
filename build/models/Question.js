"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var QuestionSchema = new _mongoose["default"].Schema({
  questionNumber: {
    type: Number,
    required: true
  },
  questionScore: {
    type: Number,
    required: true
  },
  fileUrl: {
    type: String
  },
  question: {
    type: String,
    required: true
  },
  questionContent: {
    type: String,
    required: true
  },
  post: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "Post"
  }
});

var model = _mongoose["default"].model("Question", QuestionSchema);

var _default = model;
exports["default"] = _default;