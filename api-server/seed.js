const db = require('./models')
const slug = require('slug')

// remove all articles
db.Article.remove({}, function (err) {
  if (err) return console.error(err);
  console.log('Successfully removed all articles from the DB.');
  generateArticles();
});

// fake articles
const fakeArticles = [
  {
    title: "My Great Blog: Chapter 1: The Story Begins",
    content: "<H1>My Great Blog<small>The Story Begins</small></H1>",
    url: "http://great.blog/posts/1",
    _user: null,
    date: Date.now(),
    highlights: ['a', 'b', 'c'],
    slug: slug("My Great Blog: Chapter 1: The Story Begins")
  },
  {
    title: "My Great Blog: Chapter 2: The Story Continues",
    content: "<H1>My Great Blog<small>The Story Continues</small></H1>",
    url: "http://great.blog/posts/2",
    _user: null,
    date: Date.now(),
    highlights: ['a', 'b', 'c'],
    slug: slug("My Great Blog: Chapter 2: The Story Begins")
  },
  {
    title: "My Great Blog: Chapter 3: Wow, We Still Going?",
    content: "<H1>My Great Blog<small>More of the same</small></H1>",
    url: "http://great.blog/posts/3",
    _user: null,
    date: Date.now(),
    highlights: ['a', 'b', 'c'],
    slug: slug("My Great Blog: Chapter 3: Wow, We Still Going?")
  },
  {
    title: "Have You Ever Pondered?",
    content: "<P>Take a gander at the ponderers. Oh yeah.</p>",
    url: "http://ponder.ca/posts/1",
    _user: null,
    date: Date.now(),
    highlights: ['a', 'b', 'c'],
    slug: slug("Have You Ever Pondered?")
  }
];

// create fake article documents
function generateArticles () {
  db.Article.create(fakeArticles, function (err, articles) {
    if (err) return console.error(err);
    console.log(`Successfully created ${articles.length} new articles.`);
    end();
  })
}

// exit process
function end () {
  process.exit(0);
}
