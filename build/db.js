"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config(); // .env 파일안에 있는 정보 불러올 수 있음.


_mongoose["default"].connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  return console.log("✅ Connected to DB");
};

var handleError = function handleError() {
  return console.log("❌ Error on DB Connection:${error}");
};

db.once("open", handleOpen);
db.on("error", handleError);