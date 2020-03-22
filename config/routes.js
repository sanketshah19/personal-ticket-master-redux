const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/userController')
const customersController = require('../app/controllers/customersController')
const authenticateUser = require('../app/middlewares/authentication')

router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.delete('/users/logout', authenticateUser, userController.logout)

router.get('/customers', authenticateUser, customersController.list)
router.post('/customers', authenticateUser, customersController.create)

module.exports = router