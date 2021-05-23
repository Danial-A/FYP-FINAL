const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postModel = new Schema({
    title:{
        type:String,
        required:[true, "Post title is required"],
        min:12
    },
    body:{
        type:String,
        required:[true,"Post body is required"],
        min:80
    },
    author: {
        type:mongoose.Types.ObjectId,
        ref:'users',
        required:true
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comments'
        }
],
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
],
    postType:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    }
},{
    timestamps:true
})

const Posts = mongoose.model('Posts', postModel);
module.exports= Posts

