const User = require('../models/usermodel');
const Groups = require('../models/groupModel')
const {userLoginValidation,userRegisterValidation} = require('../validation/validationSchema')
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken');
const mongoose = require('mongoose')
const Group = require('../models/groupModel');
const Rooms = require('../models/roomModel');


module.exports.get_all = (req,res)=>{
    User.find({}, (err,users)=>{
        err ? res.json(err) : res.json(users)
    })
}

//User registration
module.exports.add_new_user = async (req,res)=>{
    //Request data validation
    const {error} = userRegisterValidation(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }

   //Check if username/Email already exists
   const emailExist = await User.findOne({email: req.body.emailid})
   const userNameExists = await User.findOne({username: req.body.username})

   if(emailExist){
    return res.status(400).send("Email already Exists")
    }
    if(userNameExists){
    return res.status(400).send("Username already Exists")
    }

     //Hash password before storing
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

   const firstname = req.body.firstname;
   const lastname = req.body.lastname;
   const emailid = req.body.emailid;
   const username = req.body.username;
   const dob = Date.parse(req.body.dob)
   const profileImage = req.body.profileImage
   const newUser = new User({
       firstname,
       lastname,
       emailid,
       username,
       password: hashedPassword,
       dob,
       profileImage

   }); 
   newUser.save()
   .then(()=> res.json("User sign up successful").redirect('http://localhost:3000/home'))
   .catch((err)=>{res.status(400).json({error: err, message:"Server failed to respond" })})
}


//User Login
module.exports.user_login = async (req,res)=>{ 
   try{
         //Request Data Validation
        const {error} = userLoginValidation(req.body)
        if(error) {
            return res.status(400).send(error.details[0].message)
        }
        //Check if the username exists
        const user = await User.findOne({username: req.body.username})
        if(!user){
            return res.status(401).send("Incorrect Username Entered...")
        }
        //Check valid password
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) return res.status(401).send('Invalid Password...');
        //Token creation 
        const token = jwt.sign({_id:user._id}, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send({ token , userid:  user._id , username : user.username ,message:"Sign in successful!"})
 

   }catch(err) {
       console.log(err)
   }

}
//Following route
module.exports.following_follower = (req,res)=>{
    const userid = req.body.userid;
    User.findById(req.params.id)
    .then(user=>{
        const user_found = user.following.filter(u => u.toString() === userid)
        if(user_found.length === 0) {
            User.findOne({"_id":userid}, (err,targetUser)=>{
                if(err) res.status(400).json({error: err})
                if(targetUser === null) res.json("No user found")

                else {
                    user.following.push(mongoose.Types.ObjectId(userid))
                    user.save()
                    .then(()=>{
                        const newFollower = req.params.id
                        targetUser.followers.push(mongoose.Types.ObjectId(newFollower));
                        targetUser.save()
                        .then(()=>res.json("User added to followers and following"))
                        .catch(err=> res.status(400).json({error: err, message:"Error adding user to followers"}))
                        
                    }).catch(err=> res.status(400).json({
                        err,
                        message:"Error adding user to following"
                    }))   
                }       
            })
        }
        else {
            res.status(202).json(`You are already following this user`)
        }
    })
    .catch(err=>{res.status(400).json("Error: "+err)})
}


//remove follower
module.exports.remove_follower = (req,res)=>{
    const userid = req.body.userid;
    User.findById(req.params.id)
    .then(user=>{
        const user_found = user.followers.filter(u => u.toString() === userid)
        if(user_found.length !== 0){
            User.findOne({"_id":userid}, (err,targetUser)=>{
                if(err) res.status(400).json({error: err})
                if(targetUser === null) res.json("No user found")
                else{
                    user.followers.remove(mongoose.Types.ObjectId(userid))
                    user.save()
                    .then(()=>{
                        targetUser.following.remove(mongoose.Types.ObjectId(req.params.id))
                        targetUser.save()
                        .then(res.json("User removed from follower and following list"))
                        .catch(err=> res.status(400).json({error: err, message:"Error removing user from following"})) 
                    }).catch(err=>{
                        res.status(400).json({
                            err,
                            message:"Error removing user from followers"
                        })
                    })
                }
            })
        }else{
            res.json("This user is not your follower")
        }
    })
    .catch(err=>{res.status(400).json("Error: "+err)})
}

//remove following
module.exports.remove_following = (req,res)=>{
    const userid = req.body.userid
    User.findById(req.params.id)
    .then(user=>{
        const user_found = user.following.filter(u=> u.toString() === userid)
        if(user_found.length !== 0){
            User.findById(userid, (err,targetUser)=>{
                if(err) res.status(400).json({
                    message:"error finding target user",
                    error: err
                })
                if(targetUser === null){
                    res.json("No user found")
                }
                else{
                    user.following.remove(mongoose.Types.ObjectId(userid))
                    user.save()
                    .then(()=>{
                        targetUser.followers.remove(mongoose.Types.ObjectId(req.params.id))
                        targetUser.save()
                        .then(res.json("User removed from following users list!"))
                        .catch(err=> res.status(400).json({
                            message:"Error removing user from followers list",
                            err
                        }))
                    })
                    .catch(err=> res.status(400).json({
                        message:"Error removing user from following list",
                        err
                    }))
                }
            })
        }
        else{
            res.json("This user is not in your following list")
        }
    }).catch(err=> res.status(400).json({
        message:"error finding the main user",
        err
    }))
}

//Get user by username
module.exports.search_by_username = (req,res)=>{
    const username = req.body.username;
    User.findOne({"username":username}, (err,user)=>{
        if(err) return res.json(err)
        if(!user) return res.json({error: "No user found"})
        
        else return res.json(user)
    })
}

//Get User by id 
module.exports.search_by_id = (req,res)=>{
    User.findById(req.params.id).populate('followers following', 'username firstname lastname emailid dob').exec(function(error, user){
        if(error) res.status(400).json({
            message:"Error finding the user",
            error
        })
        else{
            return res.json(user)
        }
    })
}

//Delete user account
module.exports.delete_user_account = (req,res)=>{
    User.findByIdAndDelete(req.params.id)
    .then(res.json("User account deleted"))
    .catch(err=> res.status(400).json({error:err, message:"Error deleting user account"}))
}

//Delete all users
module.exports.nuke = (req,res)=>{
    User.deleteMany({})
    .then(res.json("Nuke Deployed"))
    .catch(err=>res.status(400).json("Error deploying the nuke...", err))
}

//Update User information
module.exports.update_user_information = (req,res)=>{
    User.findByIdAndUpdate(req.params.id, req.body, function(err,result){
        if(err) return res.status(400).json({
            error: err,
            message:"unable to update user information"
        })
        else return res.json({
            result,
            message:"User updated successfully"
        })
    })
   
}

//get all followers and follwing
module.exports.get_followers_and_following = (req,res)=>{
    User.findById(req.params.id, "followers following").populate('followers following', "_id username firstname lastname dob emailid profileImage").exec((err, users)=>{
        if(err) return res.status(400).json({
            message:"Error getting all the users",
            err
        })
        else{
            res.json(users)
        }
    })
}

//Get All followers
// module.exports.get_followers = (req,res)=>{
//     User.findById(req.params.id, "followers", (err,result)=>{
//         if(err) res.status(400).json({
//             message:"Error retrieving the followers",
//             error:err
//         })
//         else{
//             const userIdArray = result.followers.map(user=> user.userid) 
//             User.find({
//                 '_id':{
//                     $in:userIdArray
//                 }
//             }).then(result=>{
//                 res.json(result)
//             }).catch(err=>{
//                 res.status(400).json({
//                     error:err,
//                     message:"Error finding the followers for this user"
//                 })
//             })
            
//         }
//     })
    
// }
//Get all following
module.exports.get_following = (req,res)=>{
    User.findById(req.params.id, "following", async (err,result)=>{
        if(err) res.status(400).json({
            message:"Error retrieving the following users",
            error:err
        })
        else{
            const userIdArray =await result.following.map(user=> user) 
            User.find({
                '_id':{
                    $in:userIdArray
                }
            }).then(result=>{
                res.json(result)
            }).catch(err=>{
                res.status(400).json({
                    error:err,
                    message:"Error finding the following users for this user"
                })
            })
            
        }
    })
    
}

//Join group 
module.exports.join_group = (req,res)=>{
    const groupid = req.body.groupid
    User.findById(req.params.id)
    .then(user=>{
        const Group_Found = user.groups.filter(g=> g.toString() === req.body.groupid)
        if(Group_Found.length === 0){
            Groups.findById(groupid, (err,group)=>{
                if(err) res.status(400).json({
                    error:err,
                    message:"Error finding the group"
                })
                if (Group_Found === null) res.json("No group found by id ", req.body.groupid)

                else{
                    group.groupMembers.push(user._id)
                    
                    group.save()
                    .then(g=>{
                        user.groups.push(group._id)
                        user.save()
                        .then(()=>{
                            Rooms.findById(group.chatid, (err,room)=>{
                                if(err) res.status(400).json({
                                    err,
                                    message:"Error finding room"
                                })
                                else{
                                    room.participants.push(user._id)
                                    room.save()
                                    .then(res.json("User addred to group, group added to user list and user joined chat"))
                                }
                            })
                        }).catch(err=>{
                            res.status(400).json({
                                message:"Unable to join the group",
                                error:err
                            })
                        })
                    }).catch(err=>{
                        res.status(400).json({
                            err,
                            message:"error adding group member"
                        })
                    })
                   
                }
            })
        }else{
            res.json("You are already a member of this group")
        }
    }).catch(err=>{
        res.status(404).json({
            error:err,
            message:"Unable to locate the user"
        })
    })
}

//leave group
module.exports.leave_group = (req,res)=>{
    const groupid = req.body.groupid
    User.findById(req.params.id)
    .then(user=>{
        const Group_Found = user.groups.filter(g=> g.toString() === req.body.groupid)
        if(Group_Found.length !== 0){
            Groups.findById(groupid, (err,group)=>{
                if(err) res.status(400).json({
                    error:err,
                    message:"Error finding the group"
                })
                if (Group_Found === null) res.json("No group found by id ", req.body.groupid)

                else{
                    group.groupMembers.remove(user._id)
                    group.save()
                    .then(g=>{
                        user.groups.remove(group._id)
                        user.save()
                        .then(()=>{
                            Rooms.findById(group.chatid, (err,room)=>{
                                if(err) res.status(400).json({
                                    err,
                                    message:"Error finding room"
                                })
                                else{
                                    room.participants.remove(user._id)
                                    room.save()
                                    .then(res.json("User removed from group, group removed from user list and user removed from chat"))
                                }
                            })
                        }).catch(err=>{
                            res.status(400).json({
                                message:"Unable to  leave the group",
                                error:err
                            })
                        })
                    }).catch(err=>{
                        res.status(400).json({
                            err,
                            message:"error removing group member"
                        })
                    })
                   
                }
            })
        }else{
            res.json("You are not a member of this group")
        }
    }).catch(err=>{
        res.status(404).json({
            error:err,
            message:"Unable to locate the user"
        })
    })

}

//Get all user groups
module.exports.get_user_groups = (req,res)=>{
    User.findById(req.params.id, "groups").populate('groups').exec((err,groups)=>{
        if(err) res.status(400).json({
            message:"Error finding user groups",
            err
        })
        else{
            res.json(groups)
        }
    })
    
}

//user search by username
module.exports.user_search_username = (req,res)=>{
    User.aggregate([
        {
            $search:{
                "autocomplete":{
                    "query":`${req.body.query}`,
                    "path":"username"
                }
            }
        }
    ]).then(user=> res.json(user)).catch(err=>res.json(err))
}

//user search by firstname
module.exports.user_search_firstname = (req,res)=>{
    User.aggregate([
        {
            $search:{
                "autocomplete":{
                    "query":req.body.query,
                    "path":"firstname"
                }
            }
        }
    ]).then(user=> res.json(user)).catch(err=>res.json(err))
}

//user search by emailid
module.exports.user_search_emailid = (req,res)=>{
    User.aggregate([
        {
            $search:{
                "autocomplete":{
                    "query":`${req.body.query}`,
                    "path":"emailid"
                }
            }
        }
    ]).then(user=> res.json(user)).catch(err=>res.json(err))
}

//Add Chat
module.exports.add_new_chat = (req,res)=>{
    const chatid = req.body.chatid
    User.findById(req.params.id, "chats", (err,result)=>{
        if(err) return res.status(400).json({
            err,
            message:"Error finding user"
        })

        else {
            result.chats.push({chatid})
            result.save()
            .then(res=> res.json({
                res,
                message:"New chat added"
            }))
            .catch(err=> res.status(400).json({
                err,
                message:"Error adding new chat for user"
            }))
        }
    })
}

//get chats for user
module.exports.get_all_chats = (req,res)=>{
    User.findById(req.params.id, "chats", (err,user)=>{
        if(err) return res.status(400).json({
            err,
            message:"Error finding user"
        })
        else{
            res.json(user)
        }
    })
}

// delete chat for user
module.exports.delete_user_chat = (req,res)=>{
    User.findById(req.params.id)
    .then(user=>{
        const chat_found = user.chats.filter(u=> u.chatid === req.body.chatid)
        if(chat_found.length > 0){
            user.chats.id(chat_found[0]._id).remove()
            user.save()
            .then(response=> res.json({
                response,
                message:"chat deleted"
            })).catch(err=>res.status(400).json({
                err,
                message:"Error deleting chat"
            }))
        }
        else{
            return res.json("No chat found")
            
        }
    })
    .catch(err=>res.status(400).json({
        err,
        message:"Error finding user"
    }))
}

//get all user interests
module.exports.get_all_interests = (req,res)=>{
    User.findById(req.params.id, "interests", (err,user)=>{
        if(err) res.status(400).json({
            message:"Error finding the user",
            err
        })
        else{
            res.json(user)
        }
    })
}

//add interest 
module.exports.add_interest = (req,res) =>{
    User.findById(req.params.id, "interests", (err,user)=>{
        if(err) res.status(400).json({
            message:"Error finding the user",
            err
        })
        else{
            user.interests.push(req.body.interest)
            user.save()
            .then(res.json({
                message:"Interest added for user",
                interest: req.body.interest
            }))
            .catch(err=>{
                res.status(400).json({
                    message:"Error adding interest",
                    err
                })
            })
        }
    })
}

//remove interest
module.exports.remove_interest = (req,res)=>{
    User.findById(req.params.id, "interests", (err,user)=>{
        if(err) res.status(400).json({
            message:"Error finding the user",
            err
        })
        else{
            user.interests.remove(req.body.interest)
            user.save()
            .then(res.json({
                message:"language removed",
                interests : user.interests
            }))
            .catch(err=>{
                res.status(400).json({
                    message:"Error removing interest",
                    err
                })
            })
        }
    })
}

// User image upload 
module.exports.image_upload = (req,res)=>{
    User.findById(req.params.user, (err,user)=>{
        if(err) res.status(400).json({
            err,
            message:"Error getting user"
        })
        else{
            if(req.file){
                user.profileImage = req.file.path
                user.save()
                .then(res.json({
                    message:"Image uploaded",
                    image:req.file
                }))
                .catch(err => res.status(204).json({
                    message:"Error uploading the image",
                    err
                }))
            }else{
                res.json({
                    Error:"error ",
                    file:req.file
                })
            }
        }
    })
}

//user recommendations
module.exports.user_recommendations = (req,res)=>{
    User.find({}, (err,users)=>{
        if(err) res.status(400).json({
            message:"Error finding the users",
            err
        })
        else{
            User.findById(req.params.id).populate('following').exec((err,user)=>{
                if(err) res.status(400).json({
                    message:"Error finding the users",
                    err
                })
                else{
                    User.findById(req.params.id ,(err, thisuser)=>{
                        if(err) res.status(400).json({
                            message:"Error finding the users",
                            err
                        })
                        else{
                            const all_users = [...user.following, thisuser]
                            const all_user_id = all_users.map(i=> i._id)
                            const users_id = users.map(u=> u._id)
                            const result = users_id.filter(f=> all_user_id.includes(f))
                            res.json(result)
                        }
                    })
                }
            })
        }
    })
}

//get user profile image
module.exports.get_profileimage = (req,res)=>{
    User.findById(req.params.id,"profileImage",(err,user)=>{
        if(err) res.status(400).json({
            err,
            message:"Error finding user"
        })
        else{
            res.json(user.profileImage)
        }
    })
}