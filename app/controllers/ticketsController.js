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

module.exports.show = function(req, res){
    const {id} = req.params
    Ticket.findOne({_id: id, user: req.user._id}).populate('customer').populate('department').populate('employees')
            .then((ticket) => {
                if(ticket){
                    res.send(ticket)
                }else{
                    res.send({})
                }
            })
            .catch((err) => {
                res.send(err)
            })
}

module.exports.update = function(req, res){
    const {body} = req, {id} = req.params
    Ticket.findOneAndUpdate({_id: id, user: req.user._id}, body, {new: true, runValidators: true})
            .then((ticket) => {
                if(ticket){
                    res.send(ticket)
                }else{
                    res.send({})
                }
            })
            .catch((err) => {
                res.send(err)
            })
}

module.exports.destroy = function(req, res){
    const {id} = req.params
    Ticket.findOneAndDelete({_id: id, user: req.user._id})
            .then((ticket) => {
                if(ticket){
                    res.send(ticket)
                }else{
                    res.send({})
                }
            })
            .catch((err) => {
                res.send(err)
            })
}