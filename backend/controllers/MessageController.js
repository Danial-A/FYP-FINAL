const message = require('../models/messageModel')

//get all messages for testing
module.exports.get_all_messages = (req,res)=>{
    message.find({})
    .then(messages=> res.json(messages))
    .catch(err=> res.status(400).json({
        err,
        message:"Error finding messages"
    }))
}

//create message
module.exports.create_new_message= (req,res)=>{
    const {sender,reciever,roomid,content} = req.body
    const newMessage = new message({
        sender,reciever,roomid,content
    })
    newMessage.save()
    .then(message=> res.json({
        message,
        response:"New message created.."
    }))
    .catch(err=> res.status(400).json({
        err,
        message:"Error creating message"
    }))
}

//get message by id
module.exports.get_message_by_id = (req,res)=>{
    message.findById(req.params.id, (err,msg)=>{
        if(err) return res.json({
            err,
            message:"Error finding the message"
        })

        else{
            return res.json(msg)
        }
    })
    
}

//delete message by id
module.exports.delete_message = (req,res)=>{
    message.findByIdAndDelete(req.params.id)
    .then(msg=> res.json({
        msg,
        message:"Message deleted"
    })).catch(err=>{
        res.json({
            err,
            message:"Error deleting the message"
        })
    })
}

//message nuke
module.exports.delete_all_messages= (req,res)=>{
    message.deleteMany({})
    .then(res.json("Nuke deployed"))
    .catch(err=> res.status(400).json({
        err,
        message:"Error deleting messages"
    }))
}