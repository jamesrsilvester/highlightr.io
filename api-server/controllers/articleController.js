const slug = require('slug')
const Article = require('../models').Article

const getHighlights = function (content) {
  return ['must', 'write', 'method', 'getHighlights'];
}

const getTitle = function (content) {
  return 'TODO: write getTitle';
}

const create = function (req, res) {
  // create one new article
  // create new instance based on body data
  const content = req.body.content;
  const title = getTitle(content);
  const articleSlug = slug(title);
  // TODO: check for uniqueness?
  if (!req.body._user) req.body._user = null
  let body = {
    content: req.body.content,
    _user: req.body._user,
    url: req.body.url,
    date: Date.now(),
    highlights: getHighlights(content),
    title: title,
    slug: articleSlug
  };
  Article.create(body, function (err, article) {
    // error handling
    if (err) return res.status(500).json(err); // internal server error
    // on success...
    res.json(article);  // later should be url
  });
}

const index = function (req, res) {
  // get all articles and return
  Article.find({}, function (err, articles) {
    // error handling
    if (err) return res.status(500).json(err); // internal server error
    // TODO: handle no articles found?
    // on success
    res.json(articles);
  })
}

const show = function (req, res) {
  // get one article and return
  Article.findOne({slug: req.params.slug}, function (err, article) {
    // error handling
    if (err) return res.status(500).json(err); // internal server error
    // TODO: check for article not found?
    res.json(article);
  })
}

const update = function (req, res) {
  // get one article and update it
  Article.findOne({slug: req.params.slug}, function (err, article) {
    // error handling
    if (err) return res.status(500).json(err); // internal server error
    // TODO: check for article not found?
    for (let i in req.body) {
      article[i] = req.body[i];
    }
    article.save(function (err, article) {
      // error handling
      if (err) return res.status(500).json(err); // internal server error
      res.json(article);
    });
  })
}

const destroy = function (req, res) {
  // destroy one article
  Article.remove({slug: req.params.slug}, function (err, article) {
    // error handling
    if (err) return res.status(500).json(err); // internal server error
    // TODO: check for article didn't exist?
    res.json(article);
  })
}

module.exports = {
  create: create,
  index: index,
  show: show,
  update: update,
  destroy: destroy
}
