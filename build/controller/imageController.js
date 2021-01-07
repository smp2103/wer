"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteImage = exports.postEditImage = exports.getEditImage = exports.imageDetail = exports.postImageUpload = exports.getImageUpload = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _Image = _interopRequireDefault(require("../models/Image"));

var _Post = _interopRequireDefault(require("../models/Post"));

var _Question = _interopRequireDefault(require("../models/Question"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getImageUpload = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var id, post;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            id = req.params.id;
            _context.next = 3;
            return _Post["default"].findById(id);

          case 3:
            post = _context.sent;
            res.render('newImageUpload', {
              pageTitle: 'Upload',
              post: post
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getImageUpload(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getImageUpload = getImageUpload;

var postImageUpload = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var location, _req$body, questionNumber, questionScore, question, questionContent, id, post, newQuestion;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            location = req.file.location, _req$body = req.body, questionNumber = _req$body.questionNumber, questionScore = _req$body.questionScore, question = _req$body.question, questionContent = _req$body.questionContent, id = req.params.id;
            _context2.next = 3;
            return _Post["default"].findById(id);

          case 3:
            post = _context2.sent;
            _context2.next = 6;
            return _Question["default"].create({
              fileUrl: location,
              questionNumber: questionNumber,
              questionScore: questionScore,
              question: question,
              questionContent: questionContent,
              post: post.id
            });

          case 6:
            newQuestion = _context2.sent;
            req.user.save();
            post.questions.push(newQuestion._id);
            post.save();
            console.log(newQuestion);
            console.log(post);
            res.redirect(_routes["default"].postDetail(post.id));

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function postImageUpload(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.postImageUpload = postImageUpload;

var imageDetail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var id, image;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.prev = 1;
            _context3.next = 4;
            return _Image["default"].findById(id).populate('creator');

          case 4:
            image = _context3.sent;

            if (image === null) {
              next();
            } else {
              res.render('imageDetail', {
                pageTitle: "".concat(image.title),
                image: image
              });
            }

            _context3.next = 13;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            console.log(_context3.t0);
            res.redirect(_routes["default"].home);
            console.log("from imageDetail");

          case 13:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function imageDetail(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.imageDetail = imageDetail;

var getEditImage = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, postId, image, post;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id;
            postId = req.path.split('/')[1];
            _context4.prev = 2;
            _context4.next = 5;
            return _Image["default"].findById(id);

          case 5:
            image = _context4.sent;
            _context4.next = 8;
            return _Post["default"].findById(postId).populate('images');

          case 8:
            post = _context4.sent;

            if (!(image.creator != req.user.id)) {
              _context4.next = 13;
              break;
            }

            throw Error();

          case 13:
            res.render("editImage", {
              pageTitle: "Edit ".concat(image.title),
              post: post,
              image: image
            });

          case 14:
            _context4.next = 21;
            break;

          case 16:
            _context4.prev = 16;
            _context4.t0 = _context4["catch"](2);
            res.redirect(_routes["default"].home);
            console.log(_context4.t0);
            console.log("from getEditImage");

          case 21:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[2, 16]]);
  }));

  return function getEditImage(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getEditImage = getEditImage;

var postEditImage = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
    var id, _req$body2, title, description, postId, post;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            postId = req.path.split('/')[1];
            _context5.prev = 2;
            _context5.next = 5;
            return _Image["default"].findOneAndUpdate({
              _id: id
            }, {
              title: title,
              description: description
            });

          case 5:
            _context5.next = 7;
            return _Post["default"].findById(postId);

          case 7:
            post = _context5.sent;
            res.redirect("".concat(_routes["default"].postDetail(postId)));
            _context5.next = 15;
            break;

          case 11:
            _context5.prev = 11;
            _context5.t0 = _context5["catch"](2);
            res.redirect(_routes["default"].home);
            console.log("from PostEditImage");

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[2, 11]]);
  }));

  return function postEditImage(_x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

exports.postEditImage = postEditImage;

var deleteImage = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, postId, image, post;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            postId = req.path.split('/')[1];
            _context6.prev = 2;
            _context6.next = 5;
            return _Image["default"].findById(id);

          case 5:
            image = _context6.sent;
            _context6.next = 8;
            return _Post["default"].findById(postId);

          case 8:
            post = _context6.sent;

            if (!(image.creator != req.user.id)) {
              _context6.next = 13;
              break;
            }

            throw Error();

          case 13:
            _context6.next = 15;
            return _Image["default"].findOneAndRemove({
              _id: id
            });

          case 15:
            post.images.remove(id);
            post.save();

          case 17:
            _context6.next = 21;
            break;

          case 19:
            _context6.prev = 19;
            _context6.t0 = _context6["catch"](2);

          case 21:
            ;
            res.redirect(_routes["default"].home);
            console.log("from deleteImage");

          case 24:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 19]]);
  }));

  return function deleteImage(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

exports.deleteImage = deleteImage;