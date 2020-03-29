const {User} = require('../models/user')
const _ = require('lodash')
const sendEmail= require('../middlewares/email')

module.exports.register = function(req, res){
    const {body} = req
    const user = new User(body)
    user.save()
        .then((user) => {
            res.send(_.pick(user, ['_id', 'username', 'email']))
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.login = function(req, res){
    const {body} = req
    User.findByCredentials(body.email, body.password)
        .then((user) => {
            return user.generateToken()
        })
        .then((token) => {
            res.send({token})
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.logout = function(req, res){
    const {user, token} = req
    User.findByIdAndUpdate(user._id, {$pull: {tokens: {token}}})
        .then((token) => {
            res.send({notice: 'Successfully logged out'})
        })
        .catch((err) => {
            res.send(err)
        })
}

module.exports.checkEmail = function(req,res){
    const {email} = req.body
    User.findOne({email})
        .then((user)=>{
            if(!user){
                res.send({errors: 'Email is not registered'})
            }
            else{
                res.json(user)
                user.generateEmailToken()
                    .then((token)=>{
                        sendEmail(user,token) 
                    })
                    .catch((err) => {
                        res.send(err)
                    })
            } 
        })
        .catch((err)=>{
            res.send(err)
        })
}

module.exports.checkToken = function(req,res){
    const {token} = req.params
    User.findOne({resetToken:token})
        .then((user)=>{
            res.redirect(`http://localhost:3000/new-password?userId=${user._id}&passwordToken=${token}`)
        })
        .catch((err)=>{
            res.send(err)
        })
}

module.exports.newPassword = function(req, res){
    const {userId, passwordToken} = req.query
    const {password} = req.body
    User.findOne({_id:userId, resetToken:passwordToken})
        .then((user)=>{
            user.generateNewPassword(password)
                .then((user)=>{
                    res.send(_.pick(user, ['_id', 'username', 'email'])) 
                })
                .catch((err)=>{
                    res.send(err)
                })
        })
        .catch((err) => {
            res.send(err)
        })
    }