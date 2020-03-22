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

module.exports.create = function(req, res){
    const {body} = req
    const department = new Department(body)
    department.user = req.user._id
    department.save()
                .then((department) => {
                    res.send(department)
                })
                .catch((err) => {
                    res.send(err)
                })
}

module.exports.show = function(req, res){
    const id = req.params.id
    Department.findOne({_id: id, user: req.user._id})
                .then((department) => {
                    if(department){
                        res.send(department)
                    }else{
                        res.send({})
                    }
                })
                .catch((err) => {
                    res.send(err)
                })
}