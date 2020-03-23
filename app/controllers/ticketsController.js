const Ticket = require('../models/ticket')

module.exports.list = function(req, res){
    Ticket.find({user: req.user._id})
            .then((tickets) => {
                res.send(tickets)
            })
            .catch((err) => {
                res.send(err)
            })
}