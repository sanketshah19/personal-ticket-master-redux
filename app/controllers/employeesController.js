const Employee = require('../models/employee')

module.exports.list = function(req, res){
    Employee.find({user: req.user._id}).populate('department')
            .then((employees) => {
                res.send(employees)
            })
            .catch((err) => {
                res.send(err)
            })
}