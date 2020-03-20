const express = require('express')
const router = express.Router()

const userController = require('../app/controllers/userController')

router.post('/users/register', userController.register)

module.exports = router