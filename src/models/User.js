import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
require('mongoose-type-url')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl : {type: String, default: "https://rppproto.s3.amazonaws.com/avatar/63ce26c871c4502ff6c957af909dc7df"},
    facebookId: Number,
    githubId : Number,
    sex : String,
    mbti: String,
    description: String,
    link: String,
    univ: String,
    style: String,
    age: String,
    like : {
        type: Number,
        default: 0
    },
    like_created : [
        {
            type: mongoose.Schema.Types.ObjectId,
        }
    ],
    like_user : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "User"
        }
    ],
    like_post : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Post"
        }
    ],
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
      ],
    videos : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    images : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Image"
        }
    ],
    posts : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
});



UserSchema.plugin(passportLocalMongoose,{
    usernameField:'email'
});
const model = mongoose.model("User",UserSchema);

export default model;