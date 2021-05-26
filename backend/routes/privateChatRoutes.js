const router = require('express').Router()
const privateChatController = require('../controllers/privateChatController')
const { route } = require('./userRoutes')

//create new chat
router.post('/create/',privateChatController.create_new_chat)

//get all rooms
router.get('/', privateChatController.get_all_chats)

//get all chats for a user
router.get('/:id/chats', privateChatController.get_all_chats_for_a_user)

//delete all chats
router.delete('/delete', privateChatController.chat_nuke)
//get chat by id
router.get('/:id', privateChatController.get_chat_by_id)
//add new message to chat
router.post("/:id/message/new", privateChatController.new_chat_message)
//get all message for room 
router.get('/:id/message/', privateChatController.get_all_messages_in_chat)
//delete chat by id
router.delete('/:id/delete', privateChatController.delete_chat_by_id)

//delete all
router.delete('/nuke', privateChatController.delete_all_chats)
//delete all messages
router.delete('/messages/nuke', privateChatController.delete_all_messages)
module.exports = router