const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ticketSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    department: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    employees: [
        {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Employee'
        }
    ],
    priority: {
        type: String,
        required: [true, 'Priority cannot be empty'],
        enum: ['High', 'Medium', 'Low']
    },
    message: {
        type: String,
        required: [true, 'Message cannot be empty'],
        minlength: 5
    },
    isResolved: {
        type: Boolean,
        required: true,
        default: false
    },
    code: {
        type: String,
        required: [true, 'Code cannot be empty'],
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket