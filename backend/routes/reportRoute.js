const router = require('express').Router()
const reportController  = require('../controllers/reportController') 


router.get('/', reportController.get_all_reports)

router.post('/:id/report', reportController.new_report)

//get report by id
router.get('/:id', reportController.get_report_by_id)

router.post('/:id/delete', reportController.delete_report)

router.delete('/nuke', reportController.reports_nuke)

module.exports = router