const router = require('express').Router()
const messageController = require('../controllers/MessageController')


router.get('/',messageController.get_all_messages)
router.post('/create',messageController.create_new_message)
//delete message
router.delete('/delete/:id', messageController.delete_message)
//get message by id
router.get('/:id',messageController.get_message_by_id)

//message nuke
router.delete("/nuke",messageController.delete_all_messages)

module.exports = router