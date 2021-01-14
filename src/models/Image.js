import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
    fileUrl : {
        type : String,
        required : "File URL is required",
    },
    title: {
        type : String
    },
    description : String,
    views: {
        type: Number,
        default : 0
    },
    createdAt : {
        type: Date,
        default : Date.now
    },
    comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Comment"
        }
    ],
    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }
})

const model = mongoose.model("Image", imageSchema);
export default model;