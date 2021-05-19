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
            userid:{
                type:String,
                required:true,
                unique:true
            }
        }
    ],
    messages:[{
        messageid:{
            type:String,
            unique:true
        }
    }]
},{
    timestamps:true
})

const Rooms = mongoose.model('rooms', roomSchema)
module.exports = Rooms
