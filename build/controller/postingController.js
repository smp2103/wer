"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.like = exports.postPostingAuthorization = exports.getPostingAuthorization = exports.deletePosting = exports.postDetail = exports.postAddComment = exports.postPost = exports.getPost = exports.getDirection = exports.getFMuser = exports.getMuser = exports.getCommunity = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _Post = _interopRequireDefault(require("../models/Post"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _Image = _interopRequireDefault(require("../models/Image"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _User = _interopRequireDefault(require("../models/User"));

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _axios = _interopRequireDefault(require("axios"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _Question = _interopRequireDefault(require("../models/Question"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config(); //커뮤니티


var getCommunity = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, posts;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            user = req.user;
            _context.next = 4;
            return _Post["default"].find({}).populate('creator').sort({
              _id: -1
            });

          case 4:
            posts = _context.sent;
            res.render('community', {
              pageTitle: '커뮤니티',
              posts: posts
            });
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.render('community', {
              pageTitle: '커뮤니티',
              posts: []
            });

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 8]]);
  }));

  return function getCommunity(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //남자


exports.getCommunity = getCommunity;

var getMuser = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var user, users, me, posts;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            user = req.user;
            _context2.next = 4;
            return _User["default"].find({
              sex: "male"
            });

          case 4:
            users = _context2.sent;
            _context2.next = 7;
            return _User["default"].find({
              _id: user
            });

          case 7:
            me = _context2.sent;
            _context2.next = 10;
            return _Post["default"].find({}).sort({
              _id: -1
            });

          case 10:
            posts = _context2.sent;
            res.render('posting', {
              pageTitle: '위로',
              posts: posts,
              users: users,
              me: me
            });
            _context2.next = 18;
            break;

          case 14:
            _context2.prev = 14;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);
            res.render('posting', {
              pageTitle: '위로',
              posts: [],
              users: [],
              me: []
            });

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 14]]);
  }));

  return function getMuser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //여자


exports.getMuser = getMuser;

var getFMuser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user, users, me, posts;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            user = req.user;
            _context3.next = 4;
            return _User["default"].find({
              sex: "female"
            });

          case 4:
            users = _context3.sent;
            _context3.next = 7;
            return _User["default"].find({
              _id: user
            });

          case 7:
            me = _context3.sent;
            _context3.next = 10;
            return _Post["default"].find({}).sort({
              _id: -1
            });

          case 10:
            posts = _context3.sent;
            console.log(users);
            res.render('posting', {
              pageTitle: '위로',
              posts: posts,
              users: users,
              me: me
            });
            _context3.next = 19;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);
            res.render('posting', {
              pageTitle: '위로',
              posts: [],
              users: [],
              me: []
            });

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 15]]);
  }));

  return function getFMuser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getFMuser = getFMuser;

var getDirection = function getDirection(req, res) {
  res.render("direction");
}; // 새로운 포스트 생성
// GIFTWEB신청 페이지


exports.getDirection = getDirection;

var getPost = function getPost(req, res) {
  res.render("newGift");
}; // GIFTWEB 신청 post callback


exports.getPost = getPost;

var postPost = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var _req$body, title, description, user, a, newPosting;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body = req.body, title = _req$body.title, description = _req$body.description, user = req.user;
            _context4.next = 3;
            return _User["default"].findById(user._id);

          case 3:
            a = _context4.sent;
            _context4.next = 6;
            return _Post["default"].create({
              title: title,
              description: description,
              creator: user._id,
              creatorName: a.name,
              like: 0
            });

          case 6:
            newPosting = _context4.sent;
            console.log(newPosting);
            req.user.posts.push(newPosting._id);
            req.user.save();
            res.redirect(_routes["default"].home); // const key = Math.random().toString(36).substr(2,11);
            // let transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     host: 'smtp.gmail.com',
            //     port: 587,
            //     secure: false,
            //     auth: {
            //       user: process.env.NODEMAILER_USER,
            //       pass: process.env.NODEMAILER_PASS,
            //     }
            // });
            // let info = await transporter.sendMail({
            //     from: `"GIFT-WEB" <${process.env.NODEMAILER_USER}>`,
            //     to: email,
            //     subject: 'GIFT-WEB Authenticate Key',
            //     text: key,
            //     html: `<b>${key}</b>`,
            // });
            // ---------------------------------------------------------------

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postPost(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}(); // 방명록


exports.postPost = postPost;

var postAddComment = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, comment, user, _post, newComment, creator;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id, comment = req.body.comment, user = req.user;
            _context5.prev = 1;
            _context5.next = 4;
            return _Post["default"].findById(id);

          case 4:
            _post = _context5.sent;
            _context5.next = 7;
            return _Comment["default"].create({
              text: comment,
              creator: user.id,
              post: _post.id
            });

          case 7:
            newComment = _context5.sent;

            _post.comments.push(newComment);

            _post.save();

            _context5.next = 12;
            return _User["default"].findById(newComment.creator);

          case 12:
            creator = _context5.sent;
            creator.comments.push(newComment);
            creator.save();
            res.status(200).send([comment, creator]);
            _context5.next = 21;
            break;

          case 18:
            _context5.prev = 18;
            _context5.t0 = _context5["catch"](1);
            res.status(400);

          case 21:
            _context5.prev = 21;
            res.end();
            return _context5.finish(21);

          case 24:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 18, 21, 24]]);
  }));

  return function postAddComment(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}(); // 선물할 GIFTWEB 페이지 / 지금의 home 페이지 asdasdsad


exports.postAddComment = postAddComment;

var postDetail = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, _post2;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            _context6.prev = 1;
            _context6.next = 4;
            return _Post["default"].findById(id);

          case 4:
            _post2 = _context6.sent;
            res.render('postDetail', {
              pageTitle: "".concat(_post2.title),
              post: _post2
            });
            _context6.next = 11;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6["catch"](1);
            res.render('postDetail', {
              pageTitle: "".concat(post.title),
              post: []
            });

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 8]]);
  }));

  return function postDetail(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postDetail = postDetail;

var deletePosting = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, _post3;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id;
            _context7.prev = 1;
            _context7.next = 4;
            return _Post["default"].findById(id);

          case 4:
            _post3 = _context7.sent;

            if (!(_post3.creator != req.user.id)) {
              _context7.next = 9;
              break;
            }

            throw Error();

          case 9:
            _context7.next = 11;
            return _Post["default"].findOneAndRemove({
              _id: id
            });

          case 11:
            _context7.next = 15;
            break;

          case 13:
            _context7.prev = 13;
            _context7.t0 = _context7["catch"](1);

          case 15:
            ;
            res.redirect(_routes["default"].home);
            console.log("from deletePosting");

          case 18:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[1, 13]]);
  }));

  return function deletePosting(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}(); // checking KEY===ID


exports.deletePosting = deletePosting;

var getPostingAuthorization = function getPostingAuthorization(req, res) {
  res.render('postingAuthorization');
};

exports.getPostingAuthorization = getPostingAuthorization;

var postPostingAuthorization = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var key, post;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            key = req.body.key;
            _context8.next = 3;
            return _Post["default"].findById(key);

          case 3:
            post = _context8.sent;

            try {
              res.redirect(_routes["default"].postDetail(post.id));
            } catch (error) {
              res.redirect("/posting".concat(_routes["default"].postingAuthorize));
            }

          case 5:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function postPostingAuthorization(_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}(); // API


exports.postPostingAuthorization = postPostingAuthorization;

var like = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var userId, user, users;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            console.log('like function');
            userId = req.body.userId, user = req.user;
            _context9.next = 4;
            return _User["default"].findById(userId);

          case 4:
            users = _context9.sent;

            try {
              if (users.like_created.includes(user._id)) {
                users.like_created.splice(users.like_created.indexOf(user._id), 1);
                users.like -= 1;
                res.sendStatus(201);
              } else {
                users.like_created.push(user._id);
                users.like += 1;
                res.sendStatus(200);
              }

              users.save();
            } catch (error) {
              console.log(error);
            }

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function like(_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}();

exports.like = like;