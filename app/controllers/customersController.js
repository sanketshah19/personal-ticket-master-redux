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