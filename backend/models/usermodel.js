const mongoose =  require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        trim:true
    },
    emailid:{
        type: String,
        required: true,
        trim:true,
        unique:true,
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
    password:{
        type:String,
        required:true,
        trim:true,
        min:6
    },
    dob:{
        type: Date,
        required:true
    },
    chats:[
        {
            chatid:{
                type:String,
                trim:true,
                required:true,
                unique:true,
                sparse:true
            }
        }
    ]
    ,followers:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ],
    following:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ]
    ,groups:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Groups'
        }
    ]

},{
    timestamps:true,
    autoIndex:false
})
const Users = mongoose.model("users", userSchema)

module.exports = Users;