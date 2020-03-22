const Customer = require('../models/customer')

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
    const id = req.params.id
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