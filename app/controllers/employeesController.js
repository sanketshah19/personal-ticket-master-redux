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

module.exports.create = function(req, res){
    const {body} = req
    const employee = new Employee(body)
    employee.user = req.user._id
    employee.save()
            .then((employee) => {
                res.send(employee)
            })
            .catch((err) => {
                res.send(err)
            })
}

module.exports.show = function(req, res){
    const {id} = req.params
    Employee.findOne({_id: id, user: req.user._id}).populate('department')
            .then((employee) => {
                if(employee){
                    res.send(employee)
                }else{
                    res.send({})
                }
            })
            .catch((err) => {
                res.send(err)
            })
}