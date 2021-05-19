const mongoose = require('mongoose')
const schema = mongoose.Schema

const PrivateChatSchema = new schema({
    recepientUser:{
        type:String,
        unique:true,
        required:"Recipient must be defined"
    },
    requester:{
        type:String,
        unique:true,
        required:"Requester must be defined"
    },
    messages:[{
        messageid:{
            type:String,
            unique:true
        }
    }]
},{
    timestamps:true,
    autoIndex:false
})

const PrivateChat = mongoose.model('PrivateChats', PrivateChatSchema)
module.exports = PrivateChat
