import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now()
    },
    updatedAt : {
        type: Date
    },
    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    like : {
        type: Number
    },
    like_created : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    creatorName : {
        type: String
    },
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
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question"
        }
    ],
})

const model = mongoose.model("Post",PostSchema);
export default model