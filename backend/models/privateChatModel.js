const mongoose = require('mongoose')
const schema = mongoose.Schema

const PrivateChatSchema = new schema({
    participants:[
        {
            type:mongoose.Types.ObjectId,
            ref:'users'
        }
    ],
    messages:[{
        type:mongoose.Types.ObjectId,
        ref:'messages'
    }]
},{
    timestamps:true,
    autoIndex:false
})

const PrivateChat = mongoose.model('PrivateChats', PrivateChatSchema)
module.exports = PrivateChat
