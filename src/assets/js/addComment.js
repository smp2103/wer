import axios from "axios";






const lb = document.querySelectorAll('.like')


lb.forEach(el => el.addEventListener('click',async function (){
  const userId = this.value;
  const likeNumb = this.nextSibling
  const response = await axios({
    method: 'post',
    url: `/api/like`,
    data: {
       userId
    }
  })
  if( response.status === 200){
    console.log(response)
    addLike(likeNumb);
  } else if(response.status === 201){
    minusLike(likeNumb);
  }
}))

const addLike = (node) => {
  node.innerHTML = parseInt(node.innerHTML, 10) + 1;
}

const minusLike = (node) => {
  node.innerHTML = parseInt(node.innerHTML, 10) - 1;
}





// const sendLike = async() => {
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

