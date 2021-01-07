"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFullFilter = exports.getMbtiFilter = exports.getUnivFilter = exports.filtering = exports.postChangePassword = exports.getChangePassword = exports.postEditProfile = exports.getEditProfile = exports.userDetail = exports.getMe = exports.logout = exports.postGitHubLogIn = exports.githubLoginCallback = exports.githubLogin = exports.postLogin = exports.getLogin = exports.postJoin = exports.getJoin = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _User = _interopRequireDefault(require("../models/User"));

var _passport = _interopRequireDefault(require("passport"));

var _expressSession = _interopRequireDefault(require("express-session"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getJoin = function getJoin(req, res) {
  res.render('join', {
    pageTitle: 'Home'
  });
};

exports.getJoin = getJoin;

var postJoin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    var _req$body, name, sex, link, univ, age, mbti, description, email, password, password2, user;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, name = _req$body.name, sex = _req$body.sex, link = _req$body.link, univ = _req$body.univ, age = _req$body.age, mbti = _req$body.mbti, description = _req$body.description, email = _req$body.email, password = _req$body.password, password2 = _req$body.password2;
            console.log(req.body.url);

            if (!(password !== password2)) {
              _context.next = 7;
              break;
            }

            res.status(400);
            res.render('join', {
              pageTitle: 'Home'
            });
            _context.next = 22;
            break;

          case 7:
            _context.prev = 7;
            _context.next = 10;
            return (0, _User["default"])({
              name: name,
              email: email,
              mbti: mbti,
              description: description,
              sex: sex,
              link: link,
              univ: univ,
              age: age
            });

          case 10:
            user = _context.sent;
            console.log(1);

            _User["default"].register(user, password);

            console.log(2);
            next();
            _context.next = 22;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](7);
            console.log(_context.t0);
            res.redirect(_routes["default"].home);
            console.log("from postjoin");

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[7, 17]]);
  }));

  return function postJoin(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

exports.postJoin = postJoin;

var getLogin = function getLogin(req, res) {
  res.render('login', {
    pageTitle: 'Join'
  });
  console.log(req.body);
};

exports.getLogin = getLogin;

var postLogin = _passport["default"].authenticate('local', {
  failureRedirect: _routes["default"].login,
  successRedirect: _routes["default"].home
});

exports.postLogin = postLogin;

var githubLogin = _passport["default"].authenticate("github");

exports.githubLogin = githubLogin;

var githubLoginCallback = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(_, __, profile, cb) {
    var _profile$_json, id, avatar_url, name, email, user, newUser;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _profile$_json = profile._json, id = _profile$_json.id, avatar_url = _profile$_json.avatar_url, name = _profile$_json.name, email = _profile$_json.email;
            _context2.prev = 1;
            _context2.next = 4;
            return _User["default"].findOne({
              email: email
            });

          case 4:
            user = _context2.sent;

            if (!user) {
              _context2.next = 11;
              break;
            }

            user.githubId = id;
            user.save();
            return _context2.abrupt("return", cb(null, user));

          case 11:
            _context2.next = 13;
            return _User["default"].create({
              email: email,
              name: name,
              githubId: id,
              avatarUrl: avatar_url
            });

          case 13:
            newUser = _context2.sent;
            return _context2.abrupt("return", cb(null, newUser));

          case 15:
            _context2.next = 20;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", cb(_context2.t0));

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 17]]);
  }));

  return function githubLoginCallback(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

exports.githubLoginCallback = githubLoginCallback;

var postGitHubLogIn = function postGitHubLogIn(req, res) {
  res.redirect(_routes["default"].home);
  console.log("from postGIthubLogin");
};

exports.postGitHubLogIn = postGitHubLogIn;

var logout = function logout(req, res) {
  // To Do: Process logout
  req.logout();
  req.session.save(function () {
    res.redirect(_routes["default"].home);
    console.log("from logout");
  });
};

exports.logout = logout;

var getMe = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _User["default"].findById(req.user.id).populate("comments");

          case 3:
            user = _context3.sent;
            console.log(user.comments);
            res.render('userDetail', {
              pageTitle: 'User Details',
              user: user
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.render('userDetail', {
              pageTitle: 'User Details',
              user: []
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function getMe(_x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getMe = getMe;

var userDetail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, user;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            _context4.prev = 1;
            _context4.next = 4;
            return _User["default"].findById(id).populate('videos');

          case 4:
            user = _context4.sent;
            res.render('userDetail', {
              pageTitle: 'User Details',
              user: user
            });
            _context4.next = 13;
            break;

          case 8:
            _context4.prev = 8;
            _context4.t0 = _context4["catch"](1);
            console.log(_context4.t0);
            res.redirect(_routes["default"].home);
            console.log("from userDetail");

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 8]]);
  }));

  return function userDetail(_x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

exports.userDetail = userDetail;

var getEditProfile = function getEditProfile(req, res) {
  return res.render('editProfile', {
    pageTitle: 'Edit Profile'
  });
};

exports.getEditProfile = getEditProfile;

var postEditProfile = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var _req$body2, name, email, description, file, user;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, description = _req$body2.description, file = req.file;
            _context5.prev = 1;
            _context5.next = 4;
            return _User["default"].findByIdAndUpdate(req.user.id, {
              name: name,
              email: email,
              description: description,
              avatarUrl: file ? file.location : req.user.avatarUrl
            });

          case 4:
            user = _context5.sent;
            res.redirect(_routes["default"].me);
            _context5.next = 11;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            res.redirect(_routes["default"].editProfile);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));

  return function postEditProfile(_x12, _x13) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postEditProfile = postEditProfile;

var getChangePassword = function getChangePassword(req, res) {
  return res.render('changePassword', {
    pageTitle: 'Change Password'
  });
};

exports.getChangePassword = getChangePassword;

var postChangePassword = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var _req$body3, oldPassword, newPassword, newPassword1;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _req$body3 = req.body, oldPassword = _req$body3.oldPassword, newPassword = _req$body3.newPassword, newPassword1 = _req$body3.newPassword1;
            _context6.prev = 1;

            if (!(newPassword !== newPassword1)) {
              _context6.next = 6;
              break;
            }

            res.status(400);
            res.redirect("/users/".concat(_routes["default"].changePassword));
            return _context6.abrupt("return");

          case 6:
            _context6.next = 8;
            return req.user.changePassword(oldPassword, newPassword);

          case 8:
            res.redirect(_routes["default"].me);
            _context6.next = 15;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](1);
            res.status(400);
            res.redirect("/users/".concat(_routes["default"].changePassword));

          case 15:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[1, 11]]);
  }));

  return function postChangePassword(_x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();

exports.postChangePassword = postChangePassword;

var filtering = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var _req$body4, univ, mbti, users_univ, users_mbti, users;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _req$body4 = req.body, univ = _req$body4.univ, mbti = _req$body4.mbti;
            _context7.next = 3;
            return _User["default"].find({
              univ: univ
            });

          case 3:
            users_univ = _context7.sent;
            _context7.next = 6;
            return _User["default"].find({
              mbti: mbti
            });

          case 6:
            users_mbti = _context7.sent;
            _context7.next = 9;
            return _User["default"].find({
              univ: univ,
              mbti: mbti
            });

          case 9:
            users = _context7.sent;

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function filtering(_x16, _x17) {
    return _ref7.apply(this, arguments);
  };
}();

exports.filtering = filtering;

var getUnivFilter = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _User["default"].find({
              univ: univ
            });

          case 2:
            users = _context8.sent;
            res.render('univUser');

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getUnivFilter(_x18, _x19) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getUnivFilter = getUnivFilter;

var getMbtiFilter = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _User["default"].find({
              mbti: mbti
            });

          case 2:
            users = _context9.sent;
            res.render('mbtiUser');

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function getMbtiFilter(_x20, _x21) {
    return _ref9.apply(this, arguments);
  };
}();

exports.getMbtiFilter = getMbtiFilter;

var getFullFilter = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
    var users;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _User["default"].find({
              univ: univ,
              mbti: mbti
            });

          case 2:
            users = _context10.sent;
            res.render('fullUser');

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function getFullFilter(_x22, _x23) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getFullFilter = getFullFilter;