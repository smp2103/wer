import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    description : {
        type : String,
        required : "Text is required"
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    creator : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post : { 
        type: mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }, 
    creatorName: String
})

const model = mongoose.model("Comment",CommentSchema);
export default model