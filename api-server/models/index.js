const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true
})

module.exports = {
  User: require('./User'),
  Article: require('./Article')
}
