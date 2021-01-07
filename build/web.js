"use strict";

require("@babel/polyfill");

var _dotenv = _interopRequireDefault(require("dotenv"));

require("./db");

var _app = _interopRequireDefault(require("./app"));

var _passportLocalMongoose = _interopRequireDefault(require("passport-local-mongoose"));

require("./models/Video");

require("./models/Comment");

require("./models/User");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = 8001;
var MONGO_URL = process.env.MONGO_URL;

var handleListening = function handleListening() {
  return console.log("".concat(MONGO_URL, ":").concat(PORT));
};

_app["default"].listen(PORT, handleListening);