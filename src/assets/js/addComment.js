import axios from "axios";
import xlsx from "xlsx";

// 여기가 대부분의 브라우저에서 쓰이는 js 함수들



const filterButton = document.getElementById('filterButton')
const postings = document.getElementById('postings')
const join = document.getElementById('join')
const postDate = document.getElementsByClassName('postDate')
const comment = document.getElementById('commentForm-wrapper')
const postDelete = document.getElementById('postDelete')

const searchButton = document.getElementById('searchButton')
const albumDeleteButton = document.getElementById('albumDelete')

if(albumDeleteButton){

  albumDeleteButton.addEventListener('click',async function(){
    const userId = window.location.href.split("/")[4];
    const imageId = albumDeleteButton.value;
    const response = await axios({
        method: 'post',
        url: `/users/${userId}/albumDelete`,
        data: {
          userId,
          imageId
        }
      })

      if(response.status === 200){
        window.location.href = ""
      }
    })


  
  
}

if(searchButton){
  searchButton.addEventListener('click',function(){
    const searchBar = document.getElementById('searchBar')
    searchBar.placeholder = "친구 찾기"
    searchBar.style = "border: 1px solid grey;"
  })
}





if(postDelete) {
  postDelete.addEventListener('click',async function (){
    const postId = postDelete.value;
    const response = await axios({
      method: 'post',
      url: `/api/postDelete`,
      data: {
        postId
      }
    })

    if (response.status === 200) {
      alert('삭제되었습니다')
    }
  })
}


if(comment){
  comment.nextSibling.style.height = "63%"
}



var getFile = document.getElementById("getFile")


const previewFiles = function () {
  var preview = document.querySelector('#preview')
  var files = document.querySelector('input[type=file]').files;

  function readAndPreview(file) {

    if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var i = new Image();
        i.width = 300
        i.height = 300
        i.src = this.result;
        preview.appendChild(i)

      })
      reader.readAsDataURL(file);


    }
  }
  if (files) {
    [].forEach.call(files, readAndPreview)
  }
}

if (getFile) {
  getFile.onchange = previewFiles;
}


if (join) {
  join.onchange = function (e) {
    console.log("onchange")
    var files = e.target.files; //input file 객체를 가져온다.
    var i, f, json;
    for (i = 0; i != files.length; ++i) {
      f = files[i];
      var reader = new FileReader(); //FileReader를 생성한다.         
      
      //성공적으로 읽기 동작이 완료된 경우 실행되는 이벤트 핸들러를 설정한다.
      reader.onload = function (e) {

        var data = e.target.result; //FileReader 결과 데이터(컨텐츠)를 가져온다.

        //바이너리 형태로 엑셀파일을 읽는다.
        var workbook = xlsx.read(data, {
          type: 'binary'
        });

        //엑셀파일의 시트 정보를 읽어서 JSON 형태로 변환한다.
        workbook.SheetNames.forEach(function (item, index, array) {
          var EXCEL_JSON = xlsx.utils.sheet_to_json(workbook.Sheets[item]);
          console.log(JSON.stringify(EXCEL_JSON))
          const name = document.getElementById("name")
          const sex = document.getElementById("sex")
          const mbti = document.getElementById("mbti")
          const univ = document.getElementById("univ")
          const description = document.getElementById("description")
          const style = document.getElementById("style")
          const age = document.getElementById("age")
          const link = document.getElementById("link")
          name.value = EXCEL_JSON[0].name
          sex.value = EXCEL_JSON[0].sex
          mbti.value =EXCEL_JSON[0].mbti
          univ.value =EXCEL_JSON[0].univ
          description.value =EXCEL_JSON[0].description
          style.value =EXCEL_JSON[0].style
          age.value = EXCEL_JSON[0].age
          link.value = EXCEL_JSON[0].link
          
        }); //end. forEach

      }; //end onload

      //파일객체를 읽는다. 완료되면 원시 이진 데이터가 문자열로 포함됨.
      reader.readAsBinaryString(f);
    } //end. for
  }

  
  

}


if (window.location.href.split('/').pop() === "mhome") {
  const maleButton = document.getElementById('maleButton')
  const maleText = document.getElementById('maleText')
  maleButton.src = "/static/1.svg"
  maleText.style.color = "#6a35ee"
}
if (window.location.href.split('/').pop() === "fmhome") {
  const maleButton = document.getElementById('femaleButton')
  const maleText = document.getElementById('femaleText')
  maleButton.src = "/static/1.svg"
  maleText.style.color = "#6a35ee"
}


if (window.location.href.split('/').pop() === "me") {
  const maleButton = document.getElementById('myButton')
  const maleText = document.getElementById('myText')
  maleButton.src = "/static/4.svg"
  maleText.style.color = "#6a35ee"
}

if (postings) {
  const communityButton = document.getElementById('communityButton')
  const communityText = document.getElementById('communityText')
  communityButton.src = "/static/6.svg"
  communityText.style.color = "#6a35ee";
}


if (filterButton) {
  filterButton.addEventListener('click', function () {
    let univValue = document.getElementById('univFilter').value;
    let mbtiValue = document.getElementById('mbtiFilter').value;
    let univFilteredTags = document.getElementsByClassName(univValue);
    let mbtiFilteredTags = document.getElementsByClassName(mbtiValue);

    let userDatas = document.getElementsByClassName('grid-container')


    for (let k of userDatas) {
      k.classList.add('filtered')
    }

    if (univValue || mbtiValue) {

      let filtered = document.getElementsByClassName(`${mbtiValue} ${univValue}`)
      for (let a of filtered) {
        a.classList.remove('filtered')
      }
    } else {
      for (let i of mbtiFilteredTags) {
        i.classList.remove('filtered')
      }
      for (let l of univFilteredTags) {
        l.classList.remove('filtered')
      }
    }



  })
}


const refresh = document.getElementById('refresh')
if (refresh) {
  refresh.addEventListener('click', function () {
    const refreshed = document.getElementsByClassName('filtered')
    for (let k of refreshed) {
      k.classList.remove('filtered')
    }
  })

}




const lb = document.querySelectorAll('.like')
const pb = document.querySelectorAll('.postlike')
if (pb) {
  pb.forEach(el => el.addEventListener('click', async function () {
    const postId = this.value;
    const likeNumb = this.lastChild
    const response = await axios({
      method: 'post',
      url: `/api/postlike`,
      data: {
        postId
      }
    })
    if (response.status === 200) {
      console.log(response)
      addLike(likeNumb);
    } else if (response.status === 201) {
      minusLike(likeNumb);
    }
  }))

}


if (lb) {
  lb.forEach(el => el.addEventListener('click', async function () {
    const userId = this.value;
    const likeNumb = this.lastChild
    const response = await axios({
      method: 'post',
      url: `/api/like`,
      data: {
        userId
      }
    })
    if (response.status === 200) {
      console.log(response)
      addLike(likeNumb);
    } else if (response.status === 201) {
      minusLike(likeNumb);
    }
  }))
}


const addLike = (node) => {
  node.innerHTML = parseInt(node.innerHTML, 10) + 1;
}

const minusLike = (node) => {
  node.innerHTML = parseInt(node.innerHTML, 10) - 1;
}





const addComment = function (comment,user) {
  // 생성.


  const commentList = document.getElementById('commentList')

  let users = document.createElement('div')
  users.classList.add('users')
  users.id = "commentList"
  users.style = "background-color:#f2f2f2;"
  
  let grid_container = document.createElement('div')
  grid_container.classList.add('grid-container')

  users.appendChild(grid_container)
  
  let col = document.createElement('div')
  col.classList.add('col')
  col.classList.add(`${user.mbti}`)
  col.classList.add(`${user.univ}`)

  grid_container.appendChild(col)

  let information_container = document.createElement('div')
  information_container.classList.add('information-container')
  information_container.classList.add('scale')

  col.appendChild(information_container)

  let profile = document.createElement('div')
  profile.classList.add('u-profile')
  
  information_container.appendChild(profile)
  
  let avatar = document.createElement('img')
  avatar.classList.add('u-avatar')
  avatar.src = user.avatarUrl

  profile.appendChild(avatar)

  let button = document.createElement('button')
  button.classList.add('postDate')
  button.style="display:none"
  button.value = comment.createdAt

  profile.appendChild(button)

  let container = document.createElement('div')
  container.classList.add('u-container')
  
  profile.appendChild(container)

  let info = document.createElement('div')
  info.classList.add('u-info')
  info.innerHTML = `${user.univ} / ${user.mbti} / ${user.age}살 / ${user.sex}`

  container.appendChild(info)

  let name = document.createElement('div')
  name.classList.add('u-name')
  name.innerHTML = user.name
  
  container.appendChild(name)

  let description = document.createElement('div')
  description.classList.add('u-description')
  description.innerHTML = comment

  information_container.appendChild(description)
  
  let date = document.createElement('div')
  date.classList.add('date')
  date.style="margin-top: 8px;"
  date.innerHTML= "방금전"

  description.appendChild(date) 
  
  commentList.appendChild(users)


  

}

const sendComment = async comment => {
  const postId = window.location.href.split("/posting/")[1];
  const response = await axios({
    url: `/posting/${postId}`, 
    method: "POST",
    data: {
      comment
    }
  }); 
  if (response.status === 200) {
    console.log(response)
    let answer = response.data[0];
    let user = response.data[1];
    addComment(answer,user);
  }
};


const handleClick = (event) => {

  event.preventDefault();
  console.log('handleclicks')
  const comment = document.getElementById('postComment').value
  sendComment(comment);
}

const commentSubmit = document.getElementById('commentSubmit')

if(commentSubmit){
  commentSubmit.addEventListener('click',handleClick)
}
  


// function init() {

//   likeButton.addEventListener("click",handleClick);
// }

// init();