import routes from "../routes";
import Video from "../models/Video";
import Image from "../models/Image"
import Comment from "../models/Comment"
import Post from "../models/Post"
import User from "../models/User"
import Axios from "axios";
export const home = async (req,res) => {
    try{
        const videos = await Video.find({}).sort({_id: -1});
        const images = await Image.find({}).sort({_id: -1});
        
        res.render('giftweb',{pageTitle : 'Gifts',videos,images});
    } catch(error){
        console.log(error);
        res.render('giftweb',{pageTitle : 'Gifts',videos:[],images:[]});
    }
};
 
export const search =  async (req, res) => {
    const {
        query: {term: searchingBy}
    } = req;
    let users= [];
    try{
        users = await User.find({name: {$regex: searchingBy, $options: "i"}})
    }catch(error){

    };
    res.render('search', {pageTitle: '친구 찾기',searchingBy,users});
}


//new upload
export const getNewUpload = async (req,res) => {
    const { params: {id}} = req;
    const post = await Post.findById(id);

    res.render('newVideoUpload',{pageTitle : 'Upload',post});
}

//기존업로드기능
export const getUpload = (req,res) => res.render('upload',{pageTitle : 'Upload'});
export const postUpload = async (req,res) =>{
    const {
        params : {id},
        body : { title, description},
        file : { location }
    } =req;
    const post = await Post.findById(id);
    const newVideo = await Video.create({
        fileUrl : location,
        title,
        description,
        creator : req.user.id,
        post: post.id
    });
    console.log(newVideo);
    req.user.videos.push(newVideo._id);
    post.videos.push(newVideo._id)
    post.save();
    req.user.save();
    res.redirect(routes.postDetail(post.id))
}

export const videoDetail = async (req,res,next) => {
    const {params:{id}} = req;
    try{
        const video = await Video.findById(id).populate('creator')
        if(video === null){
            console.log("no such a video found")
            next();
        }else{
            res.render('videoDetail',{pageTitle : `${video.title}`, video});
        }

    } catch (error) {

        console.log(error)
        console.log("from videoDetail")
    }
};

export const getEditVideo = async (req,res) => {
    const {
        params: {id}
    } = req;
    const postId = req.path.split('/')[1]
    try{
        const video = await Video.findById(id);
        const post = await Post.findById(postId).populate('videos');
        
        if(video.creator != req.user.id){
            throw Error();

        }else{
            res.render("editVideo",{pageTitle : `Edit ${video.title}`,post, video})
        }
    }catch (error){
        res.redirect(routes.home);
        console.log(error)
        console.log("from getEditVideo")
    }
}

export const postEditVideo = async (req,res) =>{
    const {params:{id},
body : {title,description}} = req;
    const postId = req.path.split('/')[1]
    try{
        await Video.findOneAndUpdate({_id:id},{title,description});
        const post = await Post.findById(postId);
        res.redirect(`${routes.postDetail(postId)}`);
    }catch(error){
        res.redirect(routes.home);
        console.log("from postEditVideo")
    }

}

export const deleteVideo =  async (req,res) => {
    const {
        params : {id}
    } =req;
    const postId = req.path.split('/')[1]
    try{
        const video = await Video.findById(id)
        const post = await Post.findById(postId);
        if(video.creator != req.user.id){
            throw Error();
                
        }else{
            await Video.findOneAndRemove({_id:id});
            post.videos.remove(id)
            post.save();
            
            
        }
    }catch(error){};

    res.redirect(routes.home);
    console.log("from deleteVideo")
}



// Add Comment