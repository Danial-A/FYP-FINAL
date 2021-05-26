const mongoose = require('mongoose');
const schema = mongoose.Schema

const messageSchema = new schema({
    chatid:{
        type:mongoose.Types.ObjectId,
        ref:'PrivateChats'
    },
    sender:{
        type:mongoose.Types.ObjectId,
        ref:'users'
    },
    text:{
        type:String,
        required:true
    }
},
{
    timestamps:true
})

const message = mongoose.model('messages', messageSchema)
module.exports = message