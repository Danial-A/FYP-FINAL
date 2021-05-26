const mongoose = require('mongoose')
const schema = mongoose.Schema

const roomSchema = new schema({
    name:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    participants:[
        {
            type: mongoose.Types.ObjectId,
            ref:'users'
        }
    ],
    messages:[{
        type:mongoose.Types.ObjectId
    }]
},{
    timestamps:true
})

const Rooms = mongoose.model('rooms', roomSchema)
module.exports = Rooms
