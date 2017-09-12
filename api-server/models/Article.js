const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const passportLocalMongoose = require('passport-local-mongoose')

const ArticleSchema = new Schema({
  title: String,  // read from <title></title>
  date: Date, // date highlighted
  url: String,
  content: String,  // markup
  highlights: [String], // plaintext contents of highlights
  _user: { type: Schema.Types.ObjectId, ref: 'User' } // reference by ID
})

module.exports = mongoose.model('Article', ArticleSchema);
