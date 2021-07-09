const router = require('express').Router()
const feedBackController = require('../controllers/feedbackController')


//get all feedbacks
router.get('/', feedBackController.get_all_feedbacks)

//get by id
router.get('/:id', feedBackController.get_feedback_by_id)

//delete feedback
router.delete('/:id/delete', feedBackController.delete_feedback)

//new feedback
router.post('/new', feedBackController.new_feedback)


module.exports = router