const slugify = require('slug') // to distinguish from noun variable name
const Article = require('../models').Article
const parseHelper = require('./parseHelper')
const getHighlights = parseHelper.getHighlights
const getTitle = parseHelper.getTitle
const addFooter = parseHelper.addFooter

const getUniqueSlug = function (baseSlug, postfix, callback, tries) {
  // track tries to prevent unending loop
  tries = tries || 0;
  if (tries > 10) {
    console.log('Method `getUniqueSlug()` in articleController.js reached max number of tries!');
    return callback({msg: 'tried to create unique slug too many times!'});
  }
  const slug = baseSlug + (postfix === '' ? '' : '-' + postfix); // don't render - if no postfix
  Article.findOne({slug: slug}, function (err, article) {
    if (err) {
      callback(err);
    } else if (article) {
      getUniqueSlug(baseSlug, Date.now().toString(36), callback, tries + 1);  // postfix is function of time
    } else {
      console.log('found it!');
      console.log(slug);
      callback(null, slug);
    }
  });
}

const getShareable = function (slug) {
  const port = parseInt(process.env.API_PORT, 10) === 80 ? '' : `:${process.env.API_PORT}`;
  return `${process.env.BASE_URL}${port}/highlights/${slug}`
}

const showHtml = function (req, res) {
  Article.findOne({slug: req.params.slug}, function(err, article) {
    if (err) res.status(500).json(err);
    article = article.toObject(); // cast from mongoose doc to plain object
    const content = addFooter(article.content, article.url); // add branding
    res.send(content);
  });
};

const create = function (req, res) {
  // create one new article
  console.log('Article create route called.');
  console.log(req.body.content);
  // create new instance based on body data
  const title = getTitle(req.body.content);
  const baseSlug = slugify(title);
  // let's check title for uniqueness
  // TODO: validate all form data?
  if (!req.body._user) req.body._user = null;
  let body = {
    content: req.body.content,
    _user: req.body._user,
    url: req.body.url,
    date: Date.now(),
    highlights: getHighlights(req.body.content),
    title: title,
    slug: null  // will be set next
  };

  getUniqueSlug(baseSlug, '', (err, slug) => {
    if (err) res.status(500).json(err);
    // actual Article creation happens as callback
    body.slug = slug;
    Article.create(body, function (err, article) {
      // error handling
      if (err) return res.status(500).json(err); // internal server error
      // on success...
      // inject extra property, for rendering by extension
      article = article.toObject(); // convert from mongoose doc to js object
      //article.shareable = `${process.env.BASE_URL}:${process.env.API_PORT}/highlights/${article.slug}`
      article.shareable = getShareable(article.slug);
      res.json(article);
    });
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
    res.json(article);
  })
}

const update = function (req, res) {
  // get one article and update it
  console.log('article update controller called.');
  Article.findOne({slug: req.params.slug}, function (err, article) {
    // error handling
    if (err) {
      console.log('error finding article ' + req.params.slug);
      return res.status(500).json(err); // internal server error
    }
    // TODO: check for article not found?
    // TODO: validate all form data?
    if (!req.body._user) req.body._user = null;
    for (let i in req.body) {
      article[i] = req.body[i];
    }
    article.highlights = getHighlights(article.content);  // update highlights
    article.save(function (err, article) {
      // error handling
      if (err) {
        console.log('error saving article');
        console.log(err);
        return res.status(500).json(err); // internal server error
      }
      console.log('updated article');
      console.log(article.highlights);
      // inject extra property, for rendering by extension
      article = article.toObject(); // convert from mongoose doc to js object
      //article.shareable = `${process.env.BASE_URL}:${process.env.API_PORT}/highlights/${article.slug}`
      article.shareable = getShareable(article.slug);
      res.json(article);
    });
  })
}

const destroy = function (req, res) {
  // destroy one article
  Article.remove({slug: req.params.slug}, function (err, msg) {
    // error handling
    if (err) return res.status(500).json(err); // internal server error
    // TODO: check for article didn't exist?
    res.json(msg);
  })
}

module.exports = {
  create: create,
  index: index,
  show: show,
  update: update,
  destroy: destroy,
  showHtml: showHtml
}
