const mongoose = require('mongoose')
const schema = mongoose.Schema;

const feedbackSchema = new schema({
  name:{
      type:String,
      required:true,
  },
  email:{
    type:String,
    required:true,
  },
  feedbackBody:{
    type:String,
    required:true,
  }
},{
    timestamps:true,
    autoIndex:false
})

const feedback = mongoose.model('feedbacks', feedbackSchema)
module.exports = feedback 
