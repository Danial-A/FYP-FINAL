const mongoose = require('mongoose')
const schema = mongoose.Schema


const groupModel = new schema({
    title:{
        type:String,
        required:true,
        min:6
    },
    description:{
        type:String,
        required:true,
        min:6
    },
    admins:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    posts: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref:'Posts'
        }
    ],

    groupMembers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    chatid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'rooms'
    },
    channels:[
        {
            channelName:{
                type:String,
                required:[true, "Channel name must be provided"],
                unique:[true, "Channel name must be unique"]
            }
        }
    ]
    
},{
    timestamps :true,
    autoIndex:false
})

const Group = mongoose.model('Groups',groupModel)
module.exports = Group