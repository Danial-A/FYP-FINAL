const router = require('express').Router()
const roomController = require('../controllers/roomController')

//create new room
router.post('/:user/create', roomController.create_room)

//get all rooms
router.get('/', roomController.get_all_rooms)
//add new message to 
router.post('/:id/message/new', roomController.new_message_to_room)
//get room by id
router.get('/:id', roomController.get_room_by_id)

//delete room by id
router.delete('/:id/delete', roomController.delete_room_by_id)

//Get all messages in room
router.get('/:id/message/',roomController.get_all_messages_in_room)
//Delete all messages in room 
router.post('/:id/message/delete/all',roomController.delete_all_room_messages)
module.exports = router