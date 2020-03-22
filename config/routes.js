const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/userController')
const customersController = require('../app/controllers/customersController')
const departmentsController = require('../app/controllers/departmentsController')
const authenticateUser = require('../app/middlewares/authentication')

router.post('/users/register', userController.register)
router.post('/users/login', userController.login)
router.delete('/users/logout', authenticateUser, userController.logout)

router.get('/customers', authenticateUser, customersController.list)
router.post('/customers', authenticateUser, customersController.create)
router.get('/customers/:id', authenticateUser, customersController.show)
router.put('/customers/:id', authenticateUser, customersController.update)
router.delete('/customers/:id', authenticateUser, customersController.destroy)

router.get('/departments', authenticateUser, departmentsController.list)

module.exports = router