const mongoose = require('mongoose')
const dbPath = process.env.MONGODB_URI || "mongodb://localhost/tldr"
mongoose.connect(dbPath, {
  useMongoClient: true
})

module.exports = {
  User: require('./User'),
  Article: require('./Article')
}
