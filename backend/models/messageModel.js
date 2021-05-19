const mongoose = require('mongoose');
const schema = mongoose.Schema

const messageSchema = new schema({
    sender:{
        type:String,
        required:"sender is required",
        trim:true,
    },
    roomid:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const message = mongoose.model('messages', messageSchema)
module.exports = message