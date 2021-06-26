const mongoose = require('mongoose')
const schema = mongoose.Schema;

const reportSchema = new schema({
  userid:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'users',
      required: [true, "User id is required"]
  },
    postid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post',
        required: [true, "Post id is required"]
    },
    reason:{
        type:String,
        required:[true, "Reason for reporting must be provided..."]
    },
    reasonDescription:{
        type:String,
        required:[true, "Description is required"]
    }
},{
    timestamps:true,
    autoIndex:false
})

const report = mongoose.model('reports', reportSchema)
module.exports = report
