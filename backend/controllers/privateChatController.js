const PrivateChat = require('../models/privateChatModel')
const Users = require('../models/usermodel')
const message = require('../models/messageModel')
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
    const requester = req.body.requester
    const recepientUser = req.body.recepientUser
    PrivateChat.findOne({"recepientUser":recepientUser, "requester":requester})
    .then(chat=> {
        if(chat == null){
            const newChat = new PrivateChat ({
                recepientUser,requester
            })
            newChat.save()
            .then(response=>{
                const chatid = {chatid:response._id}
                Users.findById(requester,"chats",(err,user)=>{
                    if(err) return res.status(400).json({
                        err,
                        message:"Error finding requester"
                    })
                    else{
                        user.chats.push(chatid)
                        user.save()
                        .then(Response=>{
                            Users.findById(recepientUser,"chats",(err,seconduser)=>{
                                if(err) return res.status(400).json({
                                    err,
                                    message:"Error finding requester"
                                })
                                else{
                                    seconduser.chats.push(chatid)
                                    seconduser.save()
                                    .then(res.json({
                                        chatid,
                                        message:"New chat created and added for both users",
                                        seconduser
                                    })).catch(err=>res.status(400).json({
                                        err,
                                        message:"Error saving chat for recepient"
                                    }))
                                }
                            })
                        }).catch(err=> res.status(400).json({
                            err,
                            message:"Error adding chat for requester"
                        }))
                    }
                })
                
            }).catch(err=> res.status(400).json({
                err,
                message:"Error creating chat"
            }))
        }
        else if(chat !== null){
            res.json("Chat with the user already exists")
        }
    })
    .catch(err=>res.json(err))  
}

//new message in chat
module.exports.new_chat_message = (req,res)=>{
    const {sender,reciever,content} = req.body
    const chatid = req.params.id
    PrivateChat.findById(chatid)
    .then(chat=> {
        const newMessage = new message({
            sender,reciever,content,roomid:chatid
        })
        newMessage.save()
        .then(message=>{
             chat.messages.push({messageid : message._id})
             chat.save()
             .then(r=>res.json({
                messages: r.messages,
                message:"New message in chat"
            })).catch(err=> res.status(400).json({
                err,message:"Error adding new message to chat"
            }))
        }).catch(err=> res.status(400).json({
            err,
            message:"Error saving the message"
        })) 
    })
    .catch(err=> res.status(400).json({
        err,
        message:"Error finding chat"
    }))
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
    PrivateChat.findById(req.params.id)
    .then(chat=> res.json(chat))
    .catch(err=> res.status(400).json({
        err,
        message:"Error finding the chat"
    }))
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