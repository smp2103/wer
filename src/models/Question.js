import mongoose from "mongoose";

const QuestionSchema =  new mongoose.Schema({
    questionNumber : {
        type: Number,
        required: true
    },
    questionScore : {
        type: Number,
        required: true
    },
    fileUrl: {
        type: String
    },
    question : {
        type: String,
        required: true
    },
    questionContent : {
        type: String,
        required: true
    },
    post : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Post"
    }
})

const model = mongoose.model("Question",QuestionSchema);   

export default model;