const mongoose = require('mongoose')
const Group = require('../models/groupModel')
const Post = require('../models/postModel')
const Users = require('../models/usermodel')
const Rooms = require('../models/roomModel')
const {postValidationSchema} = require('../validation/validationSchema')
const {groupValidationSchema}  = require('../validation/validationSchema')

//Create new group
module.exports.create_group =async (req,res)=>{
    const userid = req.params.user
    const {error} = await groupValidationSchema(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    const title = req.body.title
    const description = req.body.description
    const newGroup = new Group({
    title,description
    })
    newGroup.save()
    .then((group)=> {
        group.admins.push(mongoose.Types.ObjectId(userid))
        const participants = [mongoose.Types.ObjectId(userid)]
        const newRoom = new Rooms({
            name:group.title,
            participants: participants
        })
        newRoom.save()
        .then(room=>{
            group.chatid = room._id
            group.save()
            .then(response=>{
                Users.findById(userid, "groups", (err,user)=>{
                    if(err) return res.status(400).json({
                        err,
                        message:"Error finding user"
                    })
                    else if(user === null) return res.json("No user exists")
                    else{
                        user.groups.push(response._id)
                        user.save()
                        .then(res.json({
                            message:"New group created, user added as admin, group added to user groups list, chat added to group",
                            group:group
                        }))
                        .catch(err=> res.status(400).json({
                            err,
                            message:"Error adding group to user list"
                        }))
                    }
                })
            }).catch(err=> res.status(400).json({
                message:"error adding chat id",
                err
            }))
        }).catch(err =>  res.status(400).json({
            err,
            message:"error creating room"
        }))

    }).catch(err=>{
        res.status(400).json({
            message:"Error creating group",
            err
        })
    })
    
        //     group.save()
    //     .then(response=>{
    //     Users.findById(userid, "groups", (err,user)=>{
    //         if(err) return res.status(400).json({
    //             err,
    //             message:"Error finding user"
    //         })
    //         else if(user === null) return res.json("No user exists")
    //         else{
    //             user.groups.push(response._id)
    //             user.save()
    //             .then(res.json("New group created, user added as admin, group added to user groups list"))
    //             .catch(err=> res.status(400).json({
    //                 err,
    //                 message:"Error adding group to user list"
    //             }))
    //         }
    //     })
    // }).catch(err=> res.status(400).json({
    //     err,
    //     message:"error creating the group"
    // }))
}

//Get All groups
module.exports.get_all_groups = (req,res)=>{
    Group.find()
    .then(groups => res.json(groups))
    .catch(err=> res.status(400).json("Error getting groups ", err))
}

//New group post
module.exports.create_group_post = async (req,res)=>{
    //Request data validation
    const {error} = await postValidationSchema(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }

    const newPost =await new Post({
                title: req.body.title,
                body:req.body.body,
                author: mongoose.Types.ObjectId(req.body.author),
                postType:req.body.postType
            })
            newPost.save()
            .then((response)=>{
                Group.findById(req.params.id, (err,group)=>{
                    if (err) res.status(400).send({
                        err,
                        message:"Error finding the group"
                    })
                    else {
                        group.posts.push(response._id)
                        group.save()
                        .then(()=>{
                            res.json({
                                message:"New post added to group",
                                post: response
                            })
                        })
                        .catch(err=> res.status(400).send({
                            err,
                            message:"Error adding post to the group"
                        }))
                    }
                })
            }).catch(err=> res.status(400).send({
                err,
                message:"Error creating the post"
            }))

}

//Get all posts in group
module.exports.get_group_posts = (req,res)=>{
    Group.findById(req.params.id).populate({
        path:"posts",
        populate:{
            path:"author",
            select:"firstname lastname username"
        }
    }).exec((err,group)=>{
        if(err) res.status(400).json({
         message:"Error finding the group",
         err
        })
        else{
            res.json(group.posts)
        }
    })
    
}

//get all users from admin ids
module.exports.get_all_users_from_admin_id = (req,res)=>{
    Group.findById(req.params.id, "admins").populate('admins').exec((err,admins)=>{
        if(err) res.status(400).json({
            err,
            message:"error finding group"
        })
        else{
            res.json(admins)
        }
    })
}

//Add admins
module.exports.add_admins = (req,res)=>{
    const userid = req.body.userid
    Group.findById(req.params.id, (err,group)=>{
        if(err) res.status(400).json({
            error:err,
            message:"Error retrieving the group"
        })
        else{
            const admin_found = group.admins.filter(a => a.toString() === userid)
            if(admin_found.length !== 0){
                res.json({
                    message:"This user is not an admin",
                    userid
                })
            }
            else{
                group.admins.push(mongoose.Types.ObjectId(userid))
                group.save()
                .then(res.json("new user added as the admin"))
                .catch(err=> {
                   res.status(400).json({
                    message:"Error adding user to the admins list",
                    err
                   })
                })
            }
        }
    })
    
}

// Remove admin
module.exports.remove_admin = (req,res)=>{
    const userid = req.body.userid
    const sender = req.body.sender
    Users.findById(sender, (err,user)=>{
        if(err) res.status(400).json({
            error:err,
            message:"Error getting user"
        })
        else{
            Group.findById(req.params.id, (err,group)=>{
                if(err) res.status(400).json({
                    error:err,
                    message:"Error getting group"
                    })
                else{
                    const is_admin = group.admins.filter(a => a.toString() === sender)
                    if(is_admin.length !== 0){
                        group.admins.remove(mongoose.Types.ObjectId(userid))
                        group.save()
                        .then(group=>{
                            Users.findById(userid, (err,user)=>{
                                if(err) res.status(400).json({
                                    error:err,
                                    message:"Error getting user"
                                })
                                else{
                                    user.groups.remove(group._id)
                                    user.save()
                                    .then(res.json("Admin removed from group and group removed from user group list"))
                                    .catch(err=> res.status(400).json({
                                        err,
                                        message:"Error removing group from user list"
                                    }))
                                }
                            })
                        }).catch(err=> res.status(400).json({
                            err,
                            message:"Error removing admin from group"
                        }))
                    }else{
                        res.json("You are not authorized to remove admin from group")
                    }
                }
            })
        }
    })
    // Group.findById(req.params.id)
    // .then(group=>{
    //     const admin = group.admins.filter(m=> m.toString() === userid)
    //     if(admin.length === 0){
    //         res.json("No user found in group admins list")
    //     }else{
    //         group.admins.remove(mongoose.Types.ObjectId(userid))
    //         group.save()
    //         .then(g => {
    //             Users.findById(userid, (err,user)=>{
    //                 if(err) res.status(400).json({
    //                     error:err,
    //                     message:"Error getting user"
    //                 })
    //                 else{
    //                     user.groups.remove(group._id)
    //                     user.save()
    //                     .then(res.json("Admin removed from "))
    //                 }
    //             })
    //         })
    //     }
    // }).catch(err => res.status(400).json({error:err, message:"Error finding the gorup"}))
}

//Add members
module.exports.add_members = (req,res)=>{
    const userid = req.body.userid
    Group.findById(req.params.id, (err,group)=>{
        if(err) res.status(400).json({
            error:err,
            message:"Error retrieving the group"
        })
        else{
            const user_found = group.groupMembers.filter(u=> u.toString() === userid)
            if(user_found.length > 0) res.json({
                message:"User is already a member",
                userid
            })
            else {
                group.groupMembers.push(mongoose.Types.ObjectId(userid))
                group.save()
                .then(group=>{
                    Users.findById(userid, "firstname lastname username groups", (err,user)=>{
                        if(err) res.status(400).json({
                            error:err,
                            message:"error finding user groups"
                        })
                        else{
                            user.groups.push(group._id)
                            user.save()
                            .then(response=>{
                                Rooms.findById(group.chatid, (err,room)=>{
                                    if(err) res.status(400).json({
                                        err,
                                        message:"Error finding chat room"
                                    })
                                    else{
                                        room.participants.push(response._id)
                                        room.save()
                                        .then(()=>{
                                            res.json("User added to group members, group added to user list, user added to room participants list")
                                        })
                                        .catch(err=> res.status(400).json({
                                            message:"Error adding user to room",err
                                        }))
                                    }
                                })
                            })
                            .catch(err=> res.status(400).json({
                                message:"Error addding the group to list",
                                err
                            }))
                        }
                    })
                })
                .catch(err=> res.status(400).json({
                    error:err,
                    message:"Error adding new member"
                }))
            }
        }
    })
}

//remove members
module.exports.remove_member = (req,res)=>{
    const userid = req.body.userid
    Group.findById(req.params.id)
    .then(group=>{
        const member = group.groupMembers.filter(m=> m.toString() === userid)
        if(member.length === 0){
            res.json("No user found in group members list")
        }else{
            group.groupMembers.remove(mongoose.Types.ObjectId(userid))
            group.save()
            res.json({
                message:"Member removed successfully",
                members:group.groupMembers
            })
        }
    }).catch(err => res.status(400).json({error:err, message:"Error finding the gorup"}))
}

//Find group by id
module.exports.get_all_members_and_admins = (req,res)=>{
    Group.findById(req.params.id).populate('admins groupMembers', 'firstname lastname emailid username dob').exec((err,group)=>{
        if(err) res.status(400).json({
            error:err,
            message:"Unable to locate the group"
        })
        else res.json(group)
    })
}

//find group by id
module.exports.find_by_id = (req,res)=>{
    Group.findById(req.params.id).populate("admins groupMembers", "firstname lastname username profileImage").populate({
        path:"posts",
        populate:{
            path:"author",
            select:"username firstname lastname"
        }
    }).exec((err,group)=>{
        if(err) res.status(400).json({
            error:err,
            message:"Unable to locate the group"
        })
        else{
            res.json(group)
        }
    })
}

//Nuke groups
module.exports.nuke = (req,res)=>{
    Group.deleteMany({})
    .then(res.json("Nuke deployed.."))
    .catch(err=> res.status(400).json({
        err,
        message:"Error deploying nuke"
    }))
}

//search group by title 
module.exports.search_by_title = (req,res)=>{
    Group.aggregate([
        {
            $search:{
                "autocomplete":{
                    "query":`${req.body.query}`,
                    "path":"title"
                }
            }
        }
    ]).then(group=> res.json(group)).catch(err=>res.json(err))
}

//create new channel
module.exports.create_new_channel = (req,res)=>{
    Group.findById(req.params.id, (err,group)=>{
        if(err) return res.status(400).json({
            message:"Error fetching group information",
            err
        })
        else{
            if(group.channels.length >= 5) {
                res.json({
                    message:"Cannot create more than 5 channels!",
                    length:group.channels.length
                })
            }else{
                const channelName = req.body.channelName
                group.channels.push({channelName})
                group.save()
                .then(res.json({
                    message:"New channel added for group",
                    channels:group.channels
                }))
                .catch(err => res.status(400).json({
                    message:"Error adding channel to the group",
                    err
                }))
                }
        }
    })
}

//delete channel
module.exports.delete_channel = (req,res)=>{
    Group.findById(req.params.id, (err,group)=>{
        if(err) return res.status(400).json({
            message:"Error fetching group information",
            err
        })
        else{
            group.channels.remove(req.body.id)
            group.save()
            .then(res.json("Channel Removed"))
            .catch(err => res.status(400).json({
                message:"Error adding channel to the group",
                err
            }))
        }
    })
}

//get all channels
module.exports.get_all_channels = (req,res) =>{
    Group.findById(req.params.id, (err,group)=>{
        if(err) return res.status(400).json({
            message:"Error fetching group information",
            err
        })
        else{
            res.json(group.channels)
        }
    })
}