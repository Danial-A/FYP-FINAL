const router = require('express').Router()
const GroupController = require('../controllers/groupPostController')
//create new
router.post('/create/:user', GroupController.create_group)
//get All groups
router.get('/', GroupController.get_all_groups)
//get group by id
router.get('/:id',GroupController.find_by_id)

//New group post
router.post('/:id/posts/create', GroupController.create_group_post)

//Get All group posts
router.get('/:id/posts', GroupController.get_group_posts)

//Add admins
router.post('/:id/admins/add', GroupController.add_admins)

//Remove admin
router.post('/:id/admins/remove', GroupController.remove_admin)

//Add group members
router.post('/:id/members/add', GroupController.add_members)

//Remove members
router.post('/:id/members/remove', GroupController.remove_member)

//get all members and admins
router.get('/:id/members/all', GroupController.get_all_members_and_admins)

//search by title
router.post('/search/', GroupController.search_by_title)

router.post('/nuke', GroupController.nuke)
module.exports = router