const Customer = require('../models/customer')
const Ticket = require('../models/ticket')

module.exports.list = function(req, res){
    Customer.find({user: req.user._id})
            .then((customers) => {
                res.send(customers)
            })
            .catch((err) => {
                res.send(err)
            })
}

module.exports.create = function(req, res){
    const {body} = req
    const customer = new Customer(body)
    customer.user = req.user._id
    customer.save()
            .then((customer) => {
                res.send(customer)
            })
            .catch((err) => {
                res.send(err)
            })
}

module.exports.show = function(req, res){
    const {id} = req.params
    Customer.findOne({_id: id, user: req.user._id})
            .then((customer) => {
                if(customer){
                    res.send(customer)
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
    Customer.findOneAndUpdate({_id: id, user: req.user._id}, body, {new: true, runValidators: true})
            .then((customer) => {
                if(customer){
                    res.send(customer)
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
    Customer.findOneAndDelete({_id: id, user: req.user._id})
            .then((customer) => {
                if(customer){
                    res.send(customer)
                }else{
                    res.send({})
                }
            })
            .catch((err) => {
                res.send(err)
            })
}

module.exports.find = function(req, res){
    const {id} = req.params
    Promise.all( [ Customer.findOne({_id: id, user: req.user._id}), Ticket.find({customer: id, user: req.user._id}).populate('customer').populate('department').populate('employees') ] )
            .then((values) => {
                if(values[0]){
                    const [customer, tickets] = values
                    res.send({customer, tickets})
                }else{
                    res.send({})
                }
            })
            .catch((err) => {
                res.send(err)
            })
}