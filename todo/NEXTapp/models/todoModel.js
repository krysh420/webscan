import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    deadline:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
})
mongoose.models = {}
export default mongoose.model("todos", todoSchema);