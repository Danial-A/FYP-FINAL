const mongoose = require('mongoose')
const schema = mongoose.Schema;

const adminSchema = new schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    username:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true,
        min:6
    },
    email:{
        type: String,
        required: true,
        trim:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        min:6
    },
    profileImage: String
},{
    timestamps:true,
    autoIndex:false
})

const admin = mongoose.model('admins', adminSchema)
module.exports = admin

