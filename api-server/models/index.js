const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/tldr")

module.exports = {
  User: require('./User'),
  Article: require('./Article')
}
