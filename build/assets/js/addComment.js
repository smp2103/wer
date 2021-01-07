"use strict";

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var lb = document.querySelectorAll('.like');
lb.forEach(function (el) {
  return el.addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var userId, likeNumb, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            userId = this.value;
            likeNumb = this.nextSibling;
            _context.next = 4;
            return (0, _axios["default"])({
              method: 'post',
              url: "/api/like",
              data: {
                userId: userId
              }
            });

          case 4:
            response = _context.sent;

            if (response.status === 200) {
              console.log(response);
              addLike(likeNumb);
            } else if (response.status === 201) {
              minusLike(likeNumb);
            }

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
});

var addLike = function addLike(node) {
  node.innerHTML = parseInt(node.innerHTML, 10) + 1;
};

var minusLike = function minusLike(node) {
  node.innerHTML = parseInt(node.innerHTML, 10) - 1;
}; // const sendLike = async() => {
//   const userId = this.value;
//   console.log("sendLike")
//   const response = await axios({
//     method: 'post',
//     url: `/api/like`,
//     data: {
//        userId
//     }
//   }); 
//   if( response.status === 200){
//     console.log(response)
//     addLike();
//   } else if(response.status === 201){
//     minusLike();
//   }
// }
// const addComment = (answer,user) => {
//   answerList.innerHTML = answer;
//   console.log("add")
// };
// const sendComment = async comment => {
//   const postId = window.location.href.split("/posting/")[1];
//   console.log(comment)
//   const response = await axios({
//     url: `/api/${postId}/comment`,
//     method: "POST",
//     data: {
//       comment
//     }
//   }); 
//   if (response.status === 200) {
//     console.log(response)
//     let answer = response.data[0];
//     let user = response.data[1];
//     addComment(answer,user);
//   }
// };
// const handleSubmit = (event) => {
//   console.log("button click")
//   event.preventDefault();
//   const answerInput = addAnswerForm.querySelector("textarea")
//   let comment = answerInput.value;
//   console.log(comment)
//   sendComment(comment);
// };
// const handleClick = (event) => {
//   event.preventDefault();
//   console.log('handleclicks')
//   sendLike();
// }
// function init() {
//   likeButton.addEventListener("click",handleClick);
// }
// init();