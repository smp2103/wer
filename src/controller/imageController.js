// 이미지 업로드관련 컨트롤러
// 앨범 이미지 업로드

import routes from "../routes"
import Image from "../models/Image"
import Post from "../models/Post"
import Question from "../models/Question";
import axios from "axios"

export const getImageUpload = async (req,res) => {
    const {params:{id}} = req;
    const post = await Post.findById(id);
    res.render('newImageUpload',{pageTitle : 'Upload',post});
}

export const postImageUpload = async (req,res) =>{
    const {file:{location},body:{questionNumber, questionScore, question, questionContent},params:{id}} = req;
    const post = await Post.findById(id);
    const newQuestion = await Question.create({
        fileUrl : location,
        questionNumber,
        questionScore,
        question,
        questionContent,
        post : post.id
    });
    req.user.save();
    post.questions.push(newQuestion._id)
    post.save()
    console.log(newQuestion)
    console.log(post)
    
    res.redirect(routes.postDetail(post.id))
}

export const imageDetail = async (req,res,next) => {
    const {params:{id}} = req;
    try{
        const image = await Image.findById(id).populate('creator')
        if(image===null){
            next();
        } else{
            res.render('imageDetail',{pageTitle : `${image.title}`, image});
        }
    } catch (error) {
        console.log(error)
        res.redirect(routes.home);
        console.log("from imageDetail")
    }
};

export const getEditImage = async (req,res) => {
    const {
        params: {id}
    } = req;
    const postId = req.path.split('/')[1]
    try{
        const image = await Image.findById(id);
        const post = await Post.findById(postId).populate('images');
        
        if(image.creator != req.user.id){
            throw Error();

        }else{
            res.render("editImage",{pageTitle : `Edit ${image.title}`,post, image})
        }
    }catch (error){
        res.redirect(routes.home);
        console.log(error)
        console.log("from getEditImage")
    }
}

export const postEditImage = async (req,res) =>{
    const {params:{id},
body : {title,description}} = req;
    const postId = req.path.split('/')[1]
    try{
        await Image.findOneAndUpdate({_id:id},{title,description});
        const post = await Post.findById(postId);
        res.redirect(`${routes.postDetail(postId)}`);
    }catch(error){
        res.redirect(routes.home);
        console.log("from PostEditImage")
    }

}

export const deleteImage =  async (req,res) => {
    const {
        params : {id}
    } =req;
    const postId = req.path.split('/')[1]
    try{
        const image = await Image.findById(id)
        const post = await Post.findById(postId);
        if(image.creator != req.user.id){
            throw Error();
                
        }else{
            await Image.findOneAndRemove({_id:id});
            post.images.remove(id)
            post.save();
            
            
        }
    }catch(error){};

    res.redirect(routes.home);
    console.log("from deleteImage")
}



