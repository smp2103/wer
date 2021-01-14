import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3"
import aws from "aws-sdk";
import cookie from "cookie"
const s3 = new aws.S3({
    accessKeyId : process.env.AWS_KEY,
    secretAccessKey : process.env.AWS_SECRET_KEY
    
})

const multerVideo = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: "rppproto/video"
    })
})
const multerAvatar = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: "rppproto/avatar"
    })
})
const multerImage = multer({
    storage: multerS3({
        s3,
        acl: 'public-read',
        bucket: "rppproto/image"
    })
})

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");
export const uploadImage = multerImage.single("img");

export const localsMiddleware = (req,res,next) => {
    res.locals.siteName = "연고링";
    res.locals.routes = routes;
    res.locals.loggedUser = req.user || null;
    next();
}


export const onlyPublic = (req,res,next) => {
    if(req.user) {
        res.redirect(routes.home);
        console.log("from onlyPublic")
    } else{
        next();
    }
};

export const onlyPrivate = (req,res,next) => {
    if(req.user) {
        next();
    } else {
        res.redirect(routes.home)
        console.log("from only Private")
    }
}

//
