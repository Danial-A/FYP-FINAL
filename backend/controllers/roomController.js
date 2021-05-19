const Rooms = require('../models/roomModel')
const message = require('../models/messageModel')

//get all rooms
module.exports.get_all_rooms = (req,res)=>{
    Rooms.find()
    .then(rooms => res.json(rooms))
    .catch(err=> res.status(400).json({
        err,
        message:"Error getting groups"
    }))
}
//delete room by id
module.exports.delete_room_by_id = (req,res)=>{
    Rooms.findByIdAndDelete(req.params.id)
    .then(room=>{
        const messagesArray = room.messages.map(m=>m.messageid)
            message.deleteMany({
                '_id':{
                    $in:messagesArray
                }
            }).then(result=> {
                res.json({
                    result,
                    message:"room and messages deleted"
                })
            })
            .catch(err=>res.status(400).json({
                err,
                message:"Error finding messages"
            }))
    }).catch(err=>res.json({
        err,
        message:"Error deleting group"
    }))
}
//create new room
module.exports.create_room = (req,res)=>{
    const roomname = req.body.name;
    Rooms.findOne({"name":roomname}, (err,room)=>{
        if(err) res.status(401).json({
            err,
            message:"Error finding the room"
        })
        if(room !== null){
            res.json("Room already exists")
        }
        else{
            const newRoom = new Rooms({
                name:roomname
            })
            newRoom.save()
            .then(room => res.json({
                room,
                message:"New room created"
            }))
            .catch(err=>{res.json({
                err,
                message:"Error creating the group"
            })})
        }
    })
}

//get room by id
module.exports.get_room_by_id = (req,res)=>{
    Rooms.findById(req.params.id)
    .then(room=> res.json(room))
    .catch(err=> res.status(400).json({
        err,
        message:"Error finding the room"
    }))
}


//New message in a chat
module.exports.new_message_to_room = (req,res)=>{
    const {sender,reciever,content} = req.body
    const roomid = req.params.id
    Rooms.findById(roomid)
    .then(room=> {
        const newMessage = new message({
            sender,reciever,content,roomid
        })
        newMessage.save()
        .then(message=>{
            room.messages.push({messageid : message._id})
            room.save()
            .then(r=>res.json({
                messages: r.messages,
                message:"New message in room"
            })).catch(err=> res.status(400).json({
                err,message:"Error adding new message to room"
            }))
        }).catch(err=> res.status(400).json({
            err,
            message:"Error saving the message"
        })) 
    })
    .catch(err=> res.status(400).json({
        err,
        message:"Error finding room"
    }))
}

//get all messages in chat
module.exports.get_all_messages_in_room = (req,res)=>{
    Rooms.findById(req.params.id, "messages", (err,result)=>{
        if(err) res.status(400).json({
            message:"Error retrieving messages for the room",
            error:err
        })
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

//Delete all messages from message collection
module.exports.delete_all_room_messages = (req,res)=>{
    Rooms.findById(req.params.id, "messages", (err,result)=>{
        if(err) res.status(400).json({
            message:"Error retrieving messages for the room",
            error:err
        })
        else{
            const messagesArray = result.messages.map(m=>m.messageid)
            message.deleteMany({
                '_id':{
                    $in:messagesArray
                }
            }).then(result=> res.json({
                result,
                message:"All messages deleted"
            }))
            .catch(err=>res.status(400).json({
                err,
                message:"Error finding messages"
            }))
        }
    })
}