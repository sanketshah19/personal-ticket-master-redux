const Ticket = require('../models/ticket')

module.exports.list = function(req, res){
    Ticket.find({user: req.user._id}).populate('customer').populate('department').populate('employees')
            .then((tickets) => {
                res.send(tickets)
            })
            .catch((err) => {
                res.send(err)
            })
}

module.exports.create = function(req, res){
    const {body} = req
    const ticket = new Ticket(body)
    ticket.user = req.user._id
    ticket.save()
            .then((ticket) => {
                res.send(ticket)
            })
            .catch((err) => {
                res.send(err)
            })
}