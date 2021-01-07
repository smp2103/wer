import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
require('mongoose-type-url')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    avatarUrl : String,
    facebookId: Number,
    githubId : Number,
    sex : String,
    mbti: String,
    description: String,
    link: String,
    univ: String,
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