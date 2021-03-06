const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const passportLocalMongoose = require('passport-local-mongoose')

const ArticleSchema = new Schema({
  title: String,  // read from <title></title>
  date: Date, // date highlighted
  url: String,  // source url
  slug: String, // slug to be used as url param
  content: String,  // markup
  highlights: [String], // plaintext contents of highlights
  // shareable: String, // not in DB, but this will be responded to ext
  _user: { type: Schema.Types.ObjectId, ref: 'User' } // reference by ID
})

module.exports = mongoose.model('Article', ArticleSchema);
