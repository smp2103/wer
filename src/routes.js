//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const FMHOME = "/fmhome"
const FJOIN = '/fjoin'
//Users
const USERS = "/users";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const USER_DETAIL = "/:id";
const ME = "/me";
const MESSAGE = "/message";

//VIdeos
const VIEDOS = "/videos";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit-video";
const DELETE_VIDEO = "/:id/delete-video";
const UPLOAD = "/upload-video"


//API

const API = "/api";
// const ADD_LIKE = "/:id/like"
const ADD_LIKE = "/like"
const FILTER = "/filter"
const TEST = "/:id/test";
const REMOVE_COMMENT = "/:id/remove";
const POST_IMAGEDATA = "/:id/postImageData"
//Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//image

const IMAGE ="/img";
const UPLOAD_IMG = "/upload-image"
const IMAGE_DETAIL = "/:id"
const EDIT_IMAGE ="/:id/edit-image"
const DELETE_IMAGE = "/:id/delete-image"

//Post

const POSTING = "/posting";
const POSTING_DETAIL = "/:id";
const NEW_GIFT = "/newGift";
const DELETE_POSTING = "/:id/delete-posting"
const POSTING_AUTH = "/authorize"
const DELETE_GIFT = "/:id/deleteGift"
//mainpage
const DIRECTION ="/direction";

// letter

const POSTING_COMMENTS = "/posting-comments"

// community

const COMMUNITY = "/community"
const POSTLIKE = "/postlike"
const AUTH = "/auth/:id"

const USERDATA = "/userData"
const MBTIUSER = "/:id"

const LIKEUSER= "/likeUser"
const DELETE_USER = "/deleteUser"
const MHOME = "/mhome"

const TEST2 = "/test"
const LOVE = "/love"
const LOVELOVE = "/love/love"

const ALBUMUPLOAD = "/album"
const routes = {
    home: HOME,
    join : JOIN,
    login : LOGIN,
    love : LOVE,
    lovelove : LOVELOVE,
    logout : LOGOUT,
    search : SEARCH,
    users : USERS,
    album : ALBUMUPLOAD,
    test : TEST2,
    me : ME,
    fjoin: FJOIN,
    male:MHOME,
    fmhome : FMHOME,
    community : COMMUNITY,
    filter: FILTER,
    postlike : POSTLIKE,
    userData : USERDATA,
    likeUser : LIKEUSER,
    deleteUser : DELETE_USER,
    auth : (id) => {
        if(id){
            return `/auth/${id}`;
        }else {
            return AUTH;
        }
    },
    userDetail : (id) => {
        if(id){
            return `/users/${id}`;
        }else {
            return USER_DETAIL;
        }
    },
    editProfile : EDIT_PROFILE,
    changePassword : CHANGE_PASSWORD,
    videos : VIEDOS,
    upload : UPLOAD,
    videoDetail : (id) => {
        if (id){
            return `/${id}`;
        }else {
            return VIDEO_DETAIL;
        }
    },
    imageDetail : (id) => {
        if (id){
            return `/${id}`;
        }else {
            return IMAGE_DETAIL;
        }
    },
    postDetail : (id) => {
        if (id){
            return `/posting/${id}`;
        }else {
            return POSTING_DETAIL;
        }
    },
    editVideo : (id) => {
        if (id){
            return `${id}/edit-video`;
        } else{
            return EDIT_VIDEO;
        }

    },
    editImage : (id) => {
        if (id){
            return `${id}/edit-image`;
        } else{
            return EDIT_IMAGE;
        }

    },
    deleteVideo : (id)=>{
        if(id) {
            return `/${id}/delete-video`;
        } else {
            return DELETE_VIDEO;
        }
    },
    deleteImage : (id)=>{
        if(id) {
            return `/${id}/delete-image`;
        } else {
            return DELETE_IMAGE;
        }
    },
    deletePosting : (id)=>{
        if(id) {
            return `/${id}/delete-posting`;
        } else {
            return DELETE_POSTING;
        }
    },
    deleteGift : (id)=>{
        if(id) {
            return `/posting/${id}/delete-Gift`;
        } else {
            return DELETE_GIFT;
        }
    },
    gitHub : GITHUB,
    githubCallback: GITHUB_CALLBACK,
    api : API,
    image : IMAGE,
    uploadImage : UPLOAD_IMG,
    addLike : ADD_LIKE,
    removeComment : REMOVE_COMMENT,
    message : MESSAGE,
    posting : POSTING,
    direction : DIRECTION,
    newGift : NEW_GIFT,
    postingAuthorize: POSTING_AUTH,
    postingComments : POSTING_COMMENTS,
    postImageData : POST_IMAGEDATA,
}

export default routes;