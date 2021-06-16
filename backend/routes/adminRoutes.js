const router = require('express').Router()
const adminController = require('../controllers/adminController')

//Get all admins
router.get('/', adminController.get_all_admins)

//add new admin
router.post('/add', adminController.add_admin)

//admin login
router.post('/login', adminController.admin_login)

//get single admin by id
router.get('/:id', adminController.get_admin_by_id)

module.exports = router