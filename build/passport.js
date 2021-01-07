"use strict";

var _passport = _interopRequireDefault(require("passport"));

var _User = _interopRequireDefault(require("./models/User"));

var _passportGithub = _interopRequireDefault(require("passport-github"));

var _userController = require("./controller/userController");

var _routes = _interopRequireDefault(require("./routes"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var MONGO_URL = process.env.MONGO_URL;

_passport["default"].use(_User["default"].createStrategy());

_passport["default"].use(new _passportGithub["default"]({
  clientID: process.env.GH_ID,
  clientSecret: process.env.GH_SECRET,
  // heroku Github
  callbackURL: "https://stormy-taiga-39906.herokuapp.com".concat(_routes["default"].githubCallback) // local Github
  // callbackURL: `http://localhost:4000${routes.githubCallback}`

}, _userController.githubLoginCallback));

_passport["default"].serializeUser(_User["default"].serializeUser());

_passport["default"].deserializeUser(_User["default"].deserializeUser());