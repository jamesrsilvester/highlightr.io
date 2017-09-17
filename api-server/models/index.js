const mongoose = require('mongoose')
mongoose.Promise = global.Promise;  // fix mongoose promise deprecation error
mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true  // fix that other error
});

module.exports = {
  User: require('./User'),
  Article: require('./Article')
}
