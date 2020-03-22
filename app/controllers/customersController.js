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