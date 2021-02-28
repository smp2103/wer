// 게시판 관련
// 게시판 댓글 / 좋아요 기능 함수 

import routes from "../routes";
import Post from "../models/Post"
import Video from "../models/Video"
import Image from "../models/Image"
import Comment from "../models/Comment"
import User from "../models/User"
import nodemailer from "nodemailer"
import axios from "axios";
import dotenv from "dotenv"

dotenv.config();

//커뮤니티
export const getCommunity = async (req,res) =>{
    try{
        const {user,query:{page}} = req;
        const m = await User.countDocuments({sex:'남자'})
        const fm = await User.countDocuments({sex:'여자'})
        const a = await User.findOne({email:'fionakim'})

        
        
        const timeForToday =  function (value) {
            const today = new Date();
            const timeValue = new Date(value);
        
            const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
            if (betweenTime < 1) return '방금전';
            if (betweenTime < 60) {
                return `${betweenTime}분전`;
            }
        
            const betweenTimeHour = Math.floor(betweenTime / 60);
            if (betweenTimeHour < 24) {
                return `${betweenTimeHour}시간전`;
            }
        
            const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
            if (betweenTimeDay <= 2) {
                return `${betweenTimeDay}일전`;
            } else if(betweenTimeDay > 2){
                if(timeValue.getMinutes()<10){
                    return `${timeValue.getMonth()+1}/${timeValue.getDate()} ${timeValue.getHours()}:0${timeValue.getMinutes()}`
                }
                return `${timeValue.getMonth()+1}/${timeValue.getDate()} ${timeValue.getHours()}:${timeValue.getMinutes()}`
            }
        }

        const totalPost = await Post.countDocuments({}); // (2)
        if (!totalPost) { // (3)
            throw Error();
        }
        let {
            startPage,
            endPage,
            hidePost,
            maxPost,
            totalPage,
            currentPage
        } = paging(page, totalPost); // (4)
        const posts = await Post.find({}).populate('creator') // (5)
            .sort({_id:-1})
            .skip(hidePost)
            .limit(maxPost);
        res.render("community", { // (6)
            posts,
            currentPage,
            startPage,
            endPage,
            maxPost,
            totalPage,
            m,
            fm,
            timeForToday
        });
    } catch(error){
        console.log(error);
        res.render('community',{pageTitle : '커뮤니티',posts:[]});
    }
}

export const getLove = async(req,res) => {
    const {user} = req;

    try{
        const love = await User.find(user._id).populate('like_created')
        const lover = love[0].like_created
        const m = await User.countDocuments({sex:'남자'})
        const fm = await User.countDocuments({sex:'여자'})
    



    
        res.render('love',{pageTitle : '연고링',lover,m,fm});
    }catch(error){
        const m = await User.countDocuments({sex:'남자'})
        const fm = await User.countDocuments({sex:'여자'})
        res.render('love',{pageTitle : '연고링',lover:[],m,fm});
    }


    
}

export const getLoveLove = async(req,res) => {
    const {user} = req;

    const love = await User.find(user).populate('like_user')
    const lover = love[0].like_user
    

    
    res.render('lovelove',{pageTitle : '연고링',lover});
}


//남자
export const getMuser = async (req,res) => {
    try{
        const {user} = req;
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
          }
        let users = [];
        const userData = await User.find({sex:"남자"});
        const me = await User.find({_id: user})
        const posts = await Post.find({}).sort({_id: -1});


        for(let k of userData){
            users.push(k)
        }

        shuffle(users)

        res.render('posting',{pageTitle : '연고링',posts,users,me}); 
    } catch(error){
        console.log(error);
        res.render('posting',{pageTitle : '연고링',posts:[],users:[],me:[]});
    }
};

export const postMuser = async (req,res) => {
    console.log(1)
    const {
        query:{page},
        body:{mbti,univ}
    } = req; // (1)
    
    console.log(page)
    const timeForToday =  function (value) {
        const today = new Date();
        const timeValue = new Date(value);

        const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
        if (betweenTime < 1) return '방금전';
        if (betweenTime < 60) {
            return `${betweenTime}분전`;
        }

        const betweenTimeHour = Math.floor(betweenTime / 60);
        if (betweenTimeHour < 24) {
            return `${betweenTimeHour}시간전`;
        }

        const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
        if (betweenTimeDay <= 2) {
            return `${betweenTimeDay}일전`;
        } else if(betweenTimeDay > 2){
            if(timeValue.getMinutes()<10){
                return `${timeValue.getMonth()+1}/${timeValue.getDate()} ${timeValue.getHours()}:0${timeValue.getMinutes()}`
            }
            return `${timeValue.getMonth()+1}/${timeValue.getDate()} ${timeValue.getHours()}:${timeValue.getMinutes()}`
        }

        return `${Math.floor(betweenTimeDay / 365)}년전`;
    }
    try {
        const totalPost = await User.countDocuments({sex:'남자'}); // (2)
        if (!totalPost) { // (3)
            throw Error();
        }
        let {
            startPage,
            endPage,
            hidePost,
            maxPost,
            totalPage,
            currentPage
        } = paging(page, totalPost); // (4)
        const users = await User.find({sex:'남자',univ,mbti}).populate('creator') // (5)
            .sort({_id:-1})
            .skip(hidePost)
            .limit(maxPost);
        res.render("newCommunity", { // (6)
            users,
            currentPage,
            startPage,
            endPage,
            maxPost,
            totalPage,
            timeForToday
        });
    } catch(error){
        console.log(error)
    }
    
}
//여자
export const getFMuser = async (req,res) => {
    try{
        const {user} = req;
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
          }
        let users = [];
        const userData = await User.find({sex:"여자"});
        const me = await User.find({_id: user})
        const posts = await Post.find({}).sort({_id: -1});

        for(let k of userData){
            users.push(k)
        }

        shuffle(users)
        res.render('posting',{pageTitle : '연고링',posts,users,me});
    } catch(error){
        console.log(error);
        res.render('posting',{pageTitle : '연고링',posts:[],users:[],me:[]});
    }
}

export const getDirection = (req,res) => {
    res.render("direction")
}


export const getPost = async (req,res) => {

    res.render("newGift") 
};


export const postPost = async (req,res) =>{
    const { 
        body : { description },
        file,
        user
    } =req;

    const a = await User.findById(user._id)

    

    console.log(new Date().getTime())
    const newPosting = await Post.create({
        description,
        creator: user._id,
        creatorName: a.name,
        like : 0,
        createdAt: new Date().getTime()
    });

    if(file){
        const postImage = await Image.create({
            fileUrl : file.location,
            creator: user._id,
        })
        newPosting.images.push(postImage._id)
        newPosting.save();
        postImage.post = newPosting._id
        postImage.save();
    }
    console.log(newPosting)
    // 작성자의 게시글 목록
    req.user.posts.push(newPosting._id);
    // 게시글에 첨부된 이미지

    // 첨부된 이미지가 들어있는 게시글
    

    req.user.save();
    res.redirect(routes.home)



    // const key = Math.random().toString(36).substr(2,11);

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
}

// 방명록
export const postAddComment = async (req, res) => {
    const {
        params: {
            id
        },
        body: {
            comment
        },
        user
    } = req;

    try{

        const post = await Post.findById(id)
        const newComment = await Comment.create({
            description: comment,
            creator : user.id,
            post: post._id,
            creatorName : user.name,
            createdAt: new Date().getTime()
        })
        post.comments.push(newComment)
        post.save();
        const creator = await User.findById(newComment.creator);
        creator.comments.push(newComment);
        creator.save();
        res.status(200).send([comment,creator]);
    } catch(error){
        res.status(400);
    } finally{
        res.end();
    }

}


// 선물할 GIFTWEB 페이지 / 지금의 home 페이지 asdasdsad

export const postDetail = async (req,res) => {
    const {params:{id}} = req;
    try{
        const post = await Post.findById(id).populate('creator').populate('images').populate({
            path: 'comments',
            populate: 'creator'
        });
        const comments = post.comments
        const timeForToday =  function (value) {
            const today = new Date(); // 생성 시각
            const timeValue = new Date(value);
        
            const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60);
            if (betweenTime < 1) return '방금전';
            if (betweenTime < 60) {
                return `${betweenTime}분전`;
            }
        
            const betweenTimeHour = Math.floor(betweenTime / 60);
            if (betweenTimeHour < 24) {
                return `${betweenTimeHour}시간전`;
            }
        
            const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
            if (betweenTimeDay <= 2) {
                return `${betweenTimeDay}일전`;
            } else if(betweenTimeDay > 2){
                if(timeValue.getMinutes()<10){
                    return `${timeValue.getMonth()+1}/${timeValue.getDate()} ${timeValue.getHours()}:0${timeValue.getMinutes()}`
                }
                return `${timeValue.getMonth()+1}/${timeValue.getDate()} ${timeValue.getHours()}:${timeValue.getMinutes()}`
            }
        
            return `${Math.floor(betweenTimeDay / 365)}년전`;
        }
        res.render('postDetail',{pageTitle : `연고링`, post,timeForToday,comments}); 
    } catch (error) {
        res.render('postDetail',{pageTitle : `연고링`, post:[]});
    }
};


export const deletePosting =  async (req,res) => {
    const {
        body:{postId}
    } =req;
    try{
        const post = await Post.findById(postId).populate('images');
        if(post.creator != req.user.id){
            throw Error();

        }else{
            await Post.findOneAndRemove({_id:postId});
            if(post.images[0]){
                await Image.findOneAndRemove({_id:post.images[0]._id})
            }
        }
    }catch(error){};

    res.redirect(routes.home);
    console.log("from deletePosting")
}

// checking KEY===ID
export const getPostingAuthorization = (req,res) => {
    res.render('postingAuthorization')
}
export const postPostingAuthorization = async (req,res) => {
    const {body:{key}} = req;
    const post = await Post.findById(key)
    try{
        res.redirect(routes.postDetail(post.id))
    } catch(error){
        res.redirect(`/posting${routes.postingAuthorize}`)
    }
}

// API

export const like = async (req,res) => {
    console.log('like function')
    const {body : {userId},user} = req;
    const users = await User.findById(userId)
    
    try{
        if(users.like_created.includes(user._id)){
            users.like_created.splice(users.like_created.indexOf(user._id),1)
            user.like_user.splice(user.like_user.indexOf(users._id),1)
            users.like -=1;
            res.sendStatus(201)
        }else {
            users.like_created.push(user._id);
            user.like_user.push(users._id);
            users.like +=1
            res.sendStatus(200)
        }

        users.save();
        user.save();
    } catch(error) {
        console.log(error)
    }

    

}


export const postlike = async (req,res) => {
    console.log('like function')
    const {body : {postId},user} = req;
    const post = await Post.findById(postId)
 
    try{
        if(post.like_created.includes(user._id)){
            post.like_created.splice(post.like_created.indexOf(user._id),1)
            user.like_post.splice(user.like_post.indexOf(postId),1)
            post.like -=1;
            res.sendStatus(201)
        }else {
            post.like_created.push(user._id);
            user.like_post.push(postId)
            post.like +=1
            res.sendStatus(200)
        }

        post.save();
        user.save();
        
    } catch(error) {
        console.log(error)
    }

    

}

export const getNotice = function (req,res) {
    res.render('notice',{pageTitle:'연고링'})
}


const paging = (page, totalPost) => {
    const maxPost = 10; // (1)
    const maxPage = 10; // (2)
    let currentPage = page ? parseInt(page) : 1; // (3)
    const hidePost = page === 1 ? 0 : (page - 1) * maxPost; // (4)
    const totalPage = Math.ceil(totalPost / maxPost); // (5)

    if (currentPage > totalPage) { // (6)
        currentPage = totalPage;
    }

    const startPage = Math.floor(((currentPage - 1) / maxPage)) * maxPage + 1; // (7)
    let endPage = startPage + maxPage - 1; // (8)

    if (endPage > totalPage) { // (9)
        endPage = totalPage;
    }

    return {
        startPage,
        endPage,
        hidePost,
        maxPost,
        totalPage,
        currentPage
    }; // (10)
};