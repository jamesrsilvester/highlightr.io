const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const passportLocalMongoose = require('passport-local-mongoose')

const ArticleSchema = new Schema({
  name: String,
  password: String
})

module.exports = mongoose.model('Article', ArticleSchema);
