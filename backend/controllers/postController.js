const Post = require('../models/postModel');
const Users = require('../models/usermodel')
const comments = require('../models/commentsModel')
const mongoose = require('mongoose')
const {postValidationSchema} = require('../validation/validationSchema');

//Retrieve all posts 
module.exports.get_all = (req,res)=>{
    Post.find().sort({createdAt :-1}).populate('author', "firstname lastname username ").exec((err,posts)=>{
        err ? res.json(err) : res.json(posts)
    })
}

//Delete all posts
module.exports.nuke =  (req,res)=>{
    Post.deleteMany({})
    .then(res.json("Nuke Deployed"))
    .catch(err=>res.status(400).json("Error deploying the nuke...", err))
}

//Add new post
module.exports.add_post = async (req,res)=>{
    //Req data validation
    const {error} = await postValidationSchema(req.body)
    if(error){
        res.status(400).send(error.details[0].message)
    }
    const newPost = new Post({
        title: req.body.title,
        body:req.body.body,
        author: mongoose.Types.ObjectId(req.body.author),
        postType:req.body.postType
    })
    newPost.save()
    .then(post =>{
        res.json({
            post,
            message:'New Post Added'
        })
    })
    .catch(err=> res.status(201).json({
        err,
        message:"Error creating post"
    }))
}

//get post by id
module.exports.get_post_by_id = (req,res)=>{
    Post.findById(req.params.id).populate({
        path:"comments",
        populate:{
            path:"userid",
            select:"firstname lastname username"
        }
    }).populate('author', 'username firstname lastname').exec((error,post)=>{
        if(error) return res.status(400).json({
            message:"error finding the post",
            error
        })
        else{
            res.status(200).json(post)
        }
    })
}

//Like or Unlike post
module.exports.like_unlike = (req,res)=>{
    const userid = req.body.userid
    Post.findById(req.params.id)
    .then(post=>{
        const like_found= post.likes.filter(p=> p.toString() === userid)
        if(like_found.length > 0){ 
            post.likes.remove(mongoose.Types.ObjectId(userid))
            post.save()
            .then(res.json({
                message:"Post Unliked",
                likes : post.likes
            }))
            .catch(err=> res.status(400).json({
                err,
                message:"Error removing like"
            }))
        }else{
            post.likes.push(mongoose.Types.ObjectId(userid))
            post.save()
            .then(res.json({
                message:"Post liked!",
                likes : post.likes
            }))
            .catch(err=>{
                res.status({
                    message:"error liking the post",
                    err,
                    
                })
            })
        }
    })
    .catch(err=> res.status(400).json("Error Finding the post ",err))
}

//Add comments
module.exports.post_comment = (req,res)=>{
    const newComment = new comments({
        userid: mongoose.Types.ObjectId(req.body.userid),
        body:req.body.body
    })
    newComment.save().then(comment=>{
        Post.findById(req.params.id)
        .then(post=>{
        post.comments.push(comment._id)
        post.save()
        res.json("New Comment added to post")
    }).catch(err=>res.status(400).json("Error adding comment to post.", err))
    })
}
//Get post comments
module.exports.get_post_comments = (req,res)=>{
    Post.findById(req.params.id).populate({
        path:'comments',
        populate:{
            path:'userid'
        }
    }).sort({createdAt :-1}).exec(function (err,post){
        if(err) return res.status(400).json(err)
        else{
            return res.json(post.comments)
        }
    })
}

//Delete Comment
module.exports.delete_comment = (req,res)=>{
    comments.findByIdAndDelete(req.params.id, (err,comment)=>{
        if(err) return res.status(400).json({
            message:"error deleting the comment",
            err
        })
        else{
            res.json({
                message:"Comment Deleted",
                comment
            })
        }
    })
}

//Update comment
module.exports.update_comment = (req,res)=>{
    
    comments.findByIdAndUpdate(req.params.id, {"body": req.body.comment},(err,result)=>{
        if(err) res.status(400).json({
            message:"Error updating comment",
            err
        })
        else{
            res.json({
                message:"Comment Updated",
                result
            })
        }
    })
}

//comments nuke
module.exports.comments_nuke = (req,res)=>{
    comments.deleteMany({}, (err,comments)=>{
        if(err) return res.status(400).json({
            error:err,
            message:"Unable to delete comments"
        })
        else{
            res.json("Comments nuke deployed")
        }
    })
}

//Get all comments on a post
// module.exports.get_all_comments = (req,res)=>{
//     Post.findById(req.params.id)
//     .then(post => res.json(post.comments))
//     .catch(err=> res.status(400).json({Error: err, message:"Error locating the post"}))
// }

//Get posts for a specific user
module.exports.user_posts = (req,res)=>{
    
    Post.find({"author":req.body.author}).populate("author", "username").sort({createdAt:-1}).exec((err,posts)=>{
        if(err)  res.status(400).json({error:err, message:"Error locating the posts"})
        else res.json(posts)
    })
}

//Delete all posts by a user
module.exports.delete_all_user_posts = (req,res)=>{
    Post.deleteMany({"author":  req.body.userid})
    .then(res.json(`All posts by ${req.body.userid} have been deleted`))
    .catch(err=> res.status(400).json({error: err, message:"Error deleting the user posts"}))
}

//Delete a single post by id
module.exports.delete_a_post_by_id = (req,res)=>{
    Post.findByIdAndDelete(req.params.id)
        .then(()=>{res.json("Post Deleted")})
        .catch(err=> res.status(400).json('Error: '+err))
}

//Update existing post
module.exports.update_post = (req,res)=>{
    Post.findByIdAndUpdate(req.params.id, req.body, (err,post)=>{
        if(err) return res.status(400).json({
            error:err,
            message:"Unable to update post"
        })
        else return res.json({
            post,
            message:"Post updated successfully"
        })
    })
}

//get all posts of the users that the current user is following
module.exports.get_following_users_posts = (req,res)=>{
    const userid = req.params.user
    Users.findById(userid, "following",(err,users)=>{
        if(err) return res.json({
            err,
            message:"Error retrieving user"
        })
        else if (users=== null) res.json("User does not exists")
        else{
           
            const result = users.following
           
            let following_posts = result.map(u=> u)
            
            following_posts = [...following_posts, userid]
            Post.find({
                'author':{
                    $in:following_posts
                }
            }).populate('author').sort({createdAt:-1}).then(response=> res.json(response))
            .catch(err=> res.status(400).json({
                err,message:"Error getting posts for user"
            }))
        }
    })
}

//get latest posts
module.exports.latest_posts = (req,res)=>{
    Post.find({}, "createdAt author likes comments").sort({createdAt: -1}).limit(5).populate({
        path:'author',
        select:"firstname lastname profileImage"
    }).exec((err,posts)=>{
        if(err) res.status(400).json({
            err,
            message:"Error getting posts"
        })
        else{
            res.json(posts)
        }
    })
}

//report post 
module.exports.report_post = (req,res)=>{
    Post.findById(req.params.id, (err,post)=>{
        
    })
}
