const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = new Schema({
    userid:{
        type:String,
        required:true,
        trim:true
    },
    body:{
        type:String,
        required:[true, "Comment body is required..."],
    }
},{
    timestamps:true
})

const comments = mongoose.model('comments', CommentSchema)
module.exports = comments