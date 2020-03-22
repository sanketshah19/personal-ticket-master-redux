const Department = require('../models/department')

module.exports.list = function(req, res){
    Department.find({user: req.user._id})
                .then((departments) => {
                    res.send(departments)
                })
                .catch((err) => {
                    res.send(err)
                })
}