import routes from "../routes";
import Post from "../models/Post"
import Video from "../models/Video"
import Image from "../models/Image"
import Comment from "../models/Comment"
import User from "../models/User"
import nodemailer from "nodemailer"
import axios from "axios";
import dotenv from "dotenv"
import Question from "../models/Question"
dotenv.config();

//커뮤니티
export const getCommunity = async (req,res) =>{
    try{
        const {user} = req;
        const posts = await Post.find({}).populate('creator').sort({_id: -1});
        
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
            if (betweenTimeDay < 365) {
                return `${betweenTimeDay}일전`;
            }
        
            return `${Math.floor(betweenTimeDay / 365)}년전`;
        }
        res.render('community',{pageTitle : '커뮤니티',posts,timeForToday});
    } catch(error){
        console.log(error);
        res.render('community',{pageTitle : '커뮤니티',posts:[]});
    }
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

        res.render('posting',{pageTitle : '연고링',posts,users,me,date});
    } catch(error){
        console.log(error);
        res.render('posting',{pageTitle : '연고링',posts:[],users:[],me:[]});
    }
};
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



// 새로운 포스트 생성

// GIFTWEB신청 페이지
export const getPost = async (req,res) => {

    res.render("newGift") 
};

// GIFTWEB 신청 post callback
export const postPost = async (req,res) =>{
    const { 
        body : { description },
        user
    } =req;

    const a = await User.findById(user._id)

    const newPosting = await Post.create({
        description,
        creator: user._id,
        creatorName: a.name,
        like : 0
    });
    console.log(newPosting)
    req.user.posts.push(newPosting._id);
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
            text: comment,
            creator : user.id,
            post: post.id
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
        const post = await Post.findById(id);
        res.render('postDetail',{pageTitle : `${post.title}`, post}); 
    } catch (error) {
        res.render('postDetail',{pageTitle : `${post.title}`, post:[]});
    }
};


export const deletePosting =  async (req,res) => {
    const {
        params : {id}
    } =req;
    try{
        const post = await Post.findById(id);
        if(post.creator != req.user.id){
            throw Error();

        }else{
            await Post.findOneAndRemove({_id:id});
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
            user.like_user.pop();
            res.sendStatus(201)
        }else {
            users.like_created.push(user._id);
            user.like_user.push(users._id);
            users.like +=1
            user.like_user.push(users)
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




export const timeForToday =  function (value) {
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
    if (betweenTimeDay < 365) {
        return `${betweenTimeDay}일전`;
    }
  
    return `${Math.floor(betweenTimeDay / 365)}년전`;
  }
  