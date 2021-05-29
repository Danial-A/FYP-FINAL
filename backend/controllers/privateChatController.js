const PrivateChat = require('../models/privateChatModel')
const Users = require('../models/usermodel')
const message = require('../models/messageModel')
const mongoose = require('mongoose')
//get all chats
module.exports.get_all_chats = (req,res)=>{
    PrivateChat.find()
    .then(chats => res.json(chats))
    .catch(err=> res.status(400).json({
        message:"Error finiding chats",
        err
    }))
}

//Create new Private Chat
module.exports.create_new_chat = (req,res)=>{
    const participants = [mongoose.Types.ObjectId(req.body.senderId), mongoose.Types.ObjectId(req.body.recieverId)]
    PrivateChat.find({'participants': {
        '$all': participants
    }}, (error,chat)=>{
        if(error) res.status(400).json({
            error,
            message:"Error finding chats"
        })
        if(chat.length !== 0) res.json("Chat already exists")
        else{
              const newConversation = new PrivateChat({
                participants
            })
            newConversation.save()
            .then(chat => res.json({
                message:"New Conversation Created",
                chat
            }))
            .catch(err=> res.status(400).json({
                err,
                message:"Error creating the chat"
            }))
        }
    })
}

//get all chats for a user
module.exports.get_all_chats_for_a_user = (req,res)=>{
    PrivateChat.find({'participants': mongoose.Types.ObjectId(req.params.id)}).exec((err,chats)=>{
        if(err) res.status(400).json({
            message:"Error retrieving chats",
            error:err
        })
        else{
            res.json(chats)
        }
    })
}

//new message in chat
module.exports.new_chat_message = (req,res)=>{
    const newMessage = new message({
        chatid: mongoose.Types.ObjectId(req.params.id),
        sender: mongoose.Types.ObjectId(req.body.sender),
        text:req.body.text
    })
    newMessage.save()
    .then(message => {
        PrivateChat.findById(req.params.id, (err,chat)=>{
            if(err) res.status(400).json({
                message:"Error retrieving chat",
                error:err
            })
            else{
                chat.messages.push(message._id)
                chat.save()
                .then(res.json({
                    response:"New message in chat added",
                    message
                }))
                .catch(err=>{
                    res.status(400).json({
                        message:"Error adding message to the chat",
                        err
                    })
                })
            }
        })
    })
}

//delete all chats
module.exports.chat_nuke = (req,res)=>{
    PrivateChat.deleteMany({}).then(res.json("Nuke Deployed"))
    .catch(err=> res.status(400).json({
        err,
        message:"Error deleting chats"
    }))
}

//get chat by id
module.exports.get_chat_by_id = (req,res)=>{
    PrivateChat.findById(req.params.id).populate('messages participants').exec((err,chat)=>{
        if(err) res.status(400).json({
            err,
            message:"error finding chat"
        })
        else{
            res.json(chat)
        }
    })
}

//get all messages for a chat
module.exports.get_all_messages_in_chat = (req,res)=>{
    PrivateChat.findById(req.params.id, "messages", (err,result)=>{
        if(err) res.status(400).json({
            message:"Error retrieving messages for the chat",
            error:err
        })
        else if(result === null) res.json("No chat found")
        else{
            const messagesArray = result.messages.map(m=>m.messageid)
            message.find({
                '_id':{
                    $in:messagesArray
                }
            }).then(result=> res.json(result))
            .catch(err=>res.status(400).json({
                err,
                message:"Error finding messages"
            }))
        }
        
    })
}

//delete chat by id and all the messages
module.exports.delete_chat_by_id = (req,res)=>{
    PrivateChat.findByIdAndDelete(req.params.id)
    .then(chat=>{
        const messagesArray = chat.messages.map(m=>m.messageid)
            message.deleteMany({
                '_id':{
                    $in:messagesArray
                }
            }).then(result=> {
                res.json({
                    result,
                    message:"chat and messages deleted"
                })
            })
            .catch(err=>res.status(400).json({
                err,
                message:"Error finding messages"
            }))
    }).catch(err=>res.json({
        err,
        message:"Error deleting chat"
    }))
}

//delete all chats
module.exports.delete_all_chats = (req,res)=>{
    PrivateChat.deleteMany({})
    .then(res.json("nuke deployed"))
    .catch(err=> res.json(err))
}

//delete all messages
module.exports.delete_all_messages = (req,res)=>{
    message.deleteMany({})
    .then(res.json("messages nuke deployed"))
    .catch(err=> res.json(err))
}

//get single chat for user two users
module.exports.get_chat_for_users =async (req,res)=>{
    try{
        const conversation = await PrivateChat.findOne({
            participants:{
                $in : [req.params.first, req.params.second]
            }
        })
        res.json(conversation)
    }catch(err){
        res.status(400).json({
            message:"Error getting chat",
            err
        })
    }
}