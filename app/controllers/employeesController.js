const Employee = require('../models/employee')
const Ticket = require('../models/ticket')

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

module.exports.update = function(req, res){
    const {body} = req, {id} = req.params
    Employee.findOneAndUpdate({_id: id, user: req.user._id}, body, {new: true, runValidators: true}).populate('department')
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

module.exports.destroy = function(req, res){
    const {id} = req.params
    Employee.findOneAndDelete({_id: id, user: req.user._id})
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

module.exports.find = function(req, res){
    const {id} = req.params
    Promise.all( [ Employee.findOne({_id: id, user: req.user._id}), Ticket.find({employees: id, user: req.user._id}).populate('customer').populate('department').populate('employees') ] )
            .then((values) => {
                if(values[0]){
                    const [employee, tickets] = values
                    res.send({employee, tickets})
                }else{
                    res.send({})
                }
            })
            .catch((err) => {
                res.send(err)
            })
}