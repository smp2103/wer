"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteVideo = exports.postEditVideo = exports.getEditVideo = exports.videoDetail = exports.postUpload = exports.getUpload = exports.getNewUpload = exports.search = exports.home = void 0;

var _routes = _interopRequireDefault(require("../routes"));

var _Video = _interopRequireDefault(require("../models/Video"));

var _Image = _interopRequireDefault(require("../models/Image"));

var _Comment = _interopRequireDefault(require("../models/Comment"));

var _Post = _interopRequireDefault(require("../models/Post"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var home = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var videos, images;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _Video["default"].find({}).sort({
              _id: -1
            });

          case 3:
            videos = _context.sent;
            _context.next = 6;
            return _Image["default"].find({}).sort({
              _id: -1
            });

          case 6:
            images = _context.sent;
            res.render('giftweb', {
              pageTitle: 'Gifts',
              videos: videos,
              images: images
            });
            _context.next = 14;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);
            res.render('giftweb', {
              pageTitle: 'Gifts',
              videos: [],
              images: []
            });

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function home(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.home = home;

var search = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var searchingBy, videos, images;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            searchingBy = req.query.term;
            videos = [];
            images = [];
            _context2.prev = 3;
            _context2.next = 6;
            return _Video["default"].find({
              title: {
                $regex: searchingBy,
                $options: "i"
              }
            });

          case 6:
            videos = _context2.sent;
            _context2.next = 9;
            return _Image["default"].find({
              title: {
                $regex: searchingBy,
                $options: "i"
              }
            });

          case 9:
            images = _context2.sent;
            _context2.next = 14;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2["catch"](3);

          case 14:
            ;
            res.render('Search', {
              pageTitle: 'Search',
              searchingBy: searchingBy,
              videos: videos,
              images: images
            });

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 12]]);
  }));

  return function search(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}(); //new upload


exports.search = search;

var getNewUpload = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
    var id, post;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            id = req.params.id;
            _context3.next = 3;
            return _Post["default"].findById(id);

          case 3:
            post = _context3.sent;
            res.render('newVideoUpload', {
              pageTitle: 'Upload',
              post: post
            });

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getNewUpload(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}(); //기존업로드기능


exports.getNewUpload = getNewUpload;

var getUpload = function getUpload(req, res) {
  return res.render('upload', {
    pageTitle: 'Upload'
  });
};

exports.getUpload = getUpload;

var postUpload = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
    var id, _req$body, title, description, location, post, newVideo;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            id = req.params.id, _req$body = req.body, title = _req$body.title, description = _req$body.description, location = req.file.location;
            _context4.next = 3;
            return _Post["default"].findById(id);

          case 3:
            post = _context4.sent;
            _context4.next = 6;
            return _Video["default"].create({
              fileUrl: location,
              title: title,
              description: description,
              creator: req.user.id,
              post: post.id
            });

          case 6:
            newVideo = _context4.sent;
            console.log(newVideo);
            req.user.videos.push(newVideo._id);
            post.videos.push(newVideo._id);
            post.save();
            req.user.save();
            res.redirect(_routes["default"].postDetail(post.id));

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function postUpload(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

exports.postUpload = postUpload;

var videoDetail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
    var id, video;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id;
            _context5.prev = 1;
            _context5.next = 4;
            return _Video["default"].findById(id).populate('creator');

          case 4:
            video = _context5.sent;

            if (video === null) {
              console.log("no such a video found");
              next();
            } else {
              res.render('videoDetail', {
                pageTitle: "".concat(video.title),
                video: video
              });
            }

            _context5.next = 12;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](1);
            console.log(_context5.t0);
            console.log("from videoDetail");

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[1, 8]]);
  }));

  return function videoDetail(_x9, _x10, _x11) {
    return _ref5.apply(this, arguments);
  };
}();

exports.videoDetail = videoDetail;

var getEditVideo = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
    var id, postId, video, post;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = req.params.id;
            postId = req.path.split('/')[1];
            _context6.prev = 2;
            _context6.next = 5;
            return _Video["default"].findById(id);

          case 5:
            video = _context6.sent;
            _context6.next = 8;
            return _Post["default"].findById(postId).populate('videos');

          case 8:
            post = _context6.sent;

            if (!(video.creator != req.user.id)) {
              _context6.next = 13;
              break;
            }

            throw Error();

          case 13:
            res.render("editVideo", {
              pageTitle: "Edit ".concat(video.title),
              post: post,
              video: video
            });

          case 14:
            _context6.next = 21;
            break;

          case 16:
            _context6.prev = 16;
            _context6.t0 = _context6["catch"](2);
            res.redirect(_routes["default"].home);
            console.log(_context6.t0);
            console.log("from getEditVideo");

          case 21:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[2, 16]]);
  }));

  return function getEditVideo(_x12, _x13) {
    return _ref6.apply(this, arguments);
  };
}();

exports.getEditVideo = getEditVideo;

var postEditVideo = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
    var id, _req$body2, title, description, postId, post;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            id = req.params.id, _req$body2 = req.body, title = _req$body2.title, description = _req$body2.description;
            postId = req.path.split('/')[1];
            _context7.prev = 2;
            _context7.next = 5;
            return _Video["default"].findOneAndUpdate({
              _id: id
            }, {
              title: title,
              description: description
            });

          case 5:
            _context7.next = 7;
            return _Post["default"].findById(postId);

          case 7:
            post = _context7.sent;
            res.redirect("".concat(_routes["default"].postDetail(postId)));
            _context7.next = 15;
            break;

          case 11:
            _context7.prev = 11;
            _context7.t0 = _context7["catch"](2);
            res.redirect(_routes["default"].home);
            console.log("from postEditVideo");

          case 15:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[2, 11]]);
  }));

  return function postEditVideo(_x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

exports.postEditVideo = postEditVideo;

var deleteVideo = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
    var id, postId, video, post;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            id = req.params.id;
            postId = req.path.split('/')[1];
            _context8.prev = 2;
            _context8.next = 5;
            return _Video["default"].findById(id);

          case 5:
            video = _context8.sent;
            _context8.next = 8;
            return _Post["default"].findById(postId);

          case 8:
            post = _context8.sent;

            if (!(video.creator != req.user.id)) {
              _context8.next = 13;
              break;
            }

            throw Error();

          case 13:
            _context8.next = 15;
            return _Video["default"].findOneAndRemove({
              _id: id
            });

          case 15:
            post.videos.remove(id);
            post.save();

          case 17:
            _context8.next = 21;
            break;

          case 19:
            _context8.prev = 19;
            _context8.t0 = _context8["catch"](2);

          case 21:
            ;
            res.redirect(_routes["default"].home);
            console.log("from deleteVideo");

          case 24:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[2, 19]]);
  }));

  return function deleteVideo(_x16, _x17) {
    return _ref8.apply(this, arguments);
  };
}(); // Add Comment


exports.deleteVideo = deleteVideo;