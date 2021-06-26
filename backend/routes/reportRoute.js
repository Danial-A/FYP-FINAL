const router = require('express').Router()
const reportController  = require('../controllers/reportController') 


router.get('/', reportController.get_all_reports)

router.post('/:id/report', reportController.new_report)

router.post('/:id/delete', reportController.delete_report)

module.exports = router