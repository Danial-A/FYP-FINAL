const Post = require('../models/postModel');
const Users = require('../models/usermodel')
const comments = require('../models/commentsModel')
const mongoose = require('mongoose')
const {postValidationSchema} = require('../validation/validationSchema')
//Retrieve all posts 
module.exports.get_all = (req,res)=>{
    Post.find().sort({createdAt :-1}).exec((err,posts)=>{
        err ? res.json(err) : res.json(posts)
    })
}

//Delete all posts
module.exports.nuke = (req,res)=>{
    Post.deleteMany({})
    .then(res.json("Nuke Deployed"))
    .catch(err=>res.status(400).json("Error deploying the nuke...", err))
}

//Add new post
module.exports.add_post =async (req,res)=>{
    //Req data validation
    const {error} =await postValidationSchema(req.body)
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
    .catch(err=> res.status(400).json("Error creating post ",err))
}

//get post by id
module.exports.get_post_by_id = (req,res)=>{
    Post.findById(req.params.id).populate('comments').populate('author', 'username').exec((error,post)=>{
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
    const username = req.body.username
    const newLike = {username}
    Post.findById(req.params.id)
    .then(post=>{
        const like_found = post.likes.filter(u=> u.username === username)
        if(like_found.length === 0){
            post.likes.push(newLike)
            post.save()
            res.json('liked')
        }else{
            post.likes.id(like_found[0]._id).remove()
            post.save()
            res.json("unliked")
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
    Post.findById(req.params.id)
    .then(post=>{
        Post.findOne({"comments._id":req.body.commentID},"comments.$", (err,result)=>{
            if(err) res.status(400).json("Error finding user ",err)
            
            post.comments.id(result.comments[0]._id).remove()
            post.save()
            .then(res.json("Comment Deleted"))
            .catch(err=> {res.status(400).json("Error deleting the comment..", err)})
        })
    })
    .catch(err=> res.status(400).json("error finding the post.",err))
}

//Update comment
module.exports.update_comment = (req,res, next)=>{
    
    Post.findById(req.params.id)
    .then(post=>{
        
        var comment = post.comments.id(req.body.id)
        comment.set(req.body)
        return post.save()
       
    })
    .then(post=> res.send(post))
    .catch(err=> res.status(404).json("Error finding the post ",err))
}

//Get all comments on a post
// module.exports.get_all_comments = (req,res)=>{
//     Post.findById(req.params.id)
//     .then(post => res.json(post.comments))
//     .catch(err=> res.status(400).json({Error: err, message:"Error locating the post"}))
// }

//Get posts for a specific user
module.exports.user_posts = (req,res)=>{
    
    Post.find({"author":req.body.author}).sort({createdAt:-1}).exec((err,posts)=>{
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