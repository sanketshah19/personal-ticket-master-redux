const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const employeeSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be empty'],
        unique: true,
        minlength: 3,
        index: true
    },
    email: {
        type: String,
        required: [true, 'Email cannot be empty'],
        unique: true,
        validate: {
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'Invalid email format'
            }
        },
        index: true
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number cannot be empty'],
        unique: true,
        minlength: 10,
        maxlength: 10,
        validate: {
            validator: function(value){
                return validator.isNumeric(value)
            },
            message: function(){
                return 'Invalid mobile format'
            }
        },
        index: true
    },
    department: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Employee = mongoose.model('Employee', employeeSchema)

module.exports = Employee