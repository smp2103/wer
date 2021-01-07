"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _helmet = _interopRequireDefault(require("helmet"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _passport = _interopRequireDefault(require("passport"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _path = _interopRequireDefault(require("path"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

require("./passport");

var _middlewares = require("./middlewares");

var _userRouter = _interopRequireDefault(require("./routers/userRouter"));

var _globalRouter = _interopRequireDefault(require("./routers/globalRouter"));

var _routes = _interopRequireDefault(require("./routes"));

var _apiRouter = _interopRequireDefault(require("./routers/apiRouter"));

var _imageRouter = _interopRequireDefault(require("./routers/imageRouter"));

var _postingRouter = _interopRequireDefault(require("./routers/postingRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// router 를 default로 export하지않았기떄문에 이렇게 한다.
var app = (0, _express["default"])(); // init 에 전달할 app 

var CookieStore = (0, _connectMongo["default"])(_expressSession["default"]);
app.use((0, _helmet["default"])());
app.set("view engine", "pug"); // express 뷰엔진 세팅

app.set("views", _path["default"].join(__dirname, "views"));
app.use("/static", _express["default"]["static"](_path["default"].join(__dirname, "static")));
app.use((0, _cookieParser["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use((0, _morgan["default"])("dev"));
app.use((0, _expressSession["default"])({
  secret: process.env.COOKIE_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new CookieStore({
    mongooseConnection: _mongoose["default"].connection
  }) //서버가 재시작되어도 쿠키를 가지고있음. 로그인세션을 유지할수있음.

}));
app.use(_passport["default"].initialize());
app.use(_passport["default"].session());
app.use(_middlewares.localsMiddleware);
app.use(_routes["default"].home, _globalRouter["default"]);
app.use(_routes["default"].posting, _postingRouter["default"]);
app.use(_routes["default"].image, _imageRouter["default"]);
app.use(_routes["default"].users, _userRouter["default"]);
app.use(_routes["default"].api, _apiRouter["default"]);
var _default = app; // appjs 를 init.js에서 이용할거임

exports["default"] = _default;