const router = require('express').Router()
const postController = require('../controllers/postController')
const tokenValidation = require('../validation/tokenValidation')

//Get all posts 
router.get('/', postController.get_all)
//Delete all posts
router.post('/nuke', postController.nuke)
//Add new post
router.post('/add', postController.add_post)
//Delete posts by a specific user
router.delete('/user/delete', postController.delete_all_user_posts)
//Delete a single post by id
router.delete('/delete/:id', postController.delete_a_post_by_id)
//Update post by id
router.post('/update/:id', postController.update_post)

//Post Like and Unlike
router.post("/:id/like", postController.like_unlike)

//Get post by ID
router.get('/:id', postController.get_post_by_id)
//Find user posts
router.post('/user/posts', postController.user_posts)
//get following users posts
router.get('/:user/get/posts',postController.get_following_users_posts)


//Comments routes
//Add comment to post
router.post("/:id/comment/add", postController.post_comment)
//Delete Comment
router.post('/:id/comment/delete', postController.delete_comment)
//update/edit comment
router.post('/:id/comment/update', postController.update_comment)
//Get All comments on a post
router.get("/:id/comments", postController.get_post_comments)
router.delete('/comments/nuke', postController.comments_nuke)

//get latest posts
router.get('/latest/posts', postController.latest_posts)

module.exports = router