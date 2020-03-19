const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)

const connectDB = () => {
    mongoose.connect('mongodb://localhost:27017/ticket-master-redux', { useNewUrlParser: true, useUnifiedTopology: true })
            .then(function(){
                console.log('connected to db')
            })
            .catch(function(err){
                console.log(err)
            })
}

module.exports = connectDB