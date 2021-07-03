const router = require('express').Router();
const userController = require('../controllers/userController')
const upload = require('../validation/upload')


//Get all users
router.get('/',userController.get_all)
//Adding new user
router.post('/register', userController.add_new_user)
//User login registration
router.post('/login', userController.user_login)
//Adding follower follower
router.post("/follower/:id", userController.following_follower)
//Remove follower
router.post("/follower/:id/remove", userController.remove_follower)
router.post("/following/:id/remove", userController.remove_following)
//delete all users
router.post('/nuke', userController.nuke)
//Find by username
router.get('/username', userController.search_by_username)
//Find user by id
router.get('/:id', userController.search_by_id)
//Delete user account
router.delete('/:id/delete', userController.delete_user_account)

//Get All followers
// router.get('/:id/followers', userController.get_followers)
//Get All user following people
// router.get('/:id/following',userController.get_following)

//Update user information
router.post('/:id/update', userController.update_user_information)

//Join new group
router.post("/:id/groups/join", userController.join_group)
//leave user group
router.post("/:id/groups/leave", userController.leave_group)

//get all user groups
router.get('/:id/groups',userController.get_user_groups)
//search user by username
router.post('/search/username',userController.user_search_username)
//search user by firstname
router.post('/search/name',userController.user_search_firstname)
//search user by emailid
router.post('/search/email',userController.user_search_emailid)
//add new chat
router.post('/:id/chats/add', userController.add_new_chat)
//Get all user chats
router.get('/:id/chats/', userController.get_all_chats)
//delete user chat
router.delete('/:id/chats/delete', userController.delete_user_chat)

//get all followers and following users
router.get('/:id/getall', userController.get_followers_and_following)
//get all interests
router.get('/:id/interests', userController.get_all_interests)
//add interest
router.post('/:id/interests/add', userController.add_interest)
//remove interest
router.post('/:id/interests/remove', userController.remove_interest)
//upload profile image
router.post('/:user/image/upload', upload.single('file'), userController.image_upload)

//get user recommendations
router.get('/:id/recommendations', userController.user_recommendations)

//get profile image
router.get('/:id/profile/image', userController.get_profileimage)

//get new registered users
router.get('/new/registered', userController.get_new_registered)

//get all users for admin
router.get('/admin/all', userController.get_all_admin_users)

//get screenshot
router.get('/get/screenshot', userController.get_screenshot)
module.exports = router