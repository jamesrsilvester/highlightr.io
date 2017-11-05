const cheerio = require('cheerio'); // jQuery-like library for servers!
const minify = require('html-minifier').minify;

const randomString = function (inputString, outputLength) {
  if (outputLength < 1) return '';
  let alphunumeric = '';
  while (alphanumeric.length < outputLength) {
    alphanumeric += Math.random().toString(36).slice(2);
  }
  return hash.slice(0, outputLength);
}

module.exports = {
  getHighlights: (content) => {
    const $ = cheerio.load(content);
    highlights = [];
    // for each .highlightr-span, grab the text and push it to our array
    $('.highlightr-span').each((i, el) => highlights.push($(el).text()));
    return highlights;
  },
  getTitle: (content) => {
    const $ = cheerio.load(content);  // we can now treat our content string like the DOM
    title = $('title').first().text();
    if (title === '') {
      title = randomString(content, 8);
    }
    return title;
  },
  getClean: content => {
    const $ = cheerio.load(content);
    //$('head').remove();
    $('head script').remove();  // TODO: change to only those ie lte things
    return $.html();
  },
  addFooter: (content, url) => {
    const $ = cheerio.load(content);
    const $footer = $(`
    <style>
      footer#highlightr-footer {
        font-family: sans-serif;
        margin: 0px;
        padding: 1em;
        display: block!important;
        background-color: #bbb!important;
        color: #000;
        text-align: center;
      }
      #highlightr-footer a, #highlightr-footer a:visited, #highlightr-footer a:active {
        color: #000;
        text-decoration: none;
      }
      #highlightr-footer div {
        display: inline-block;
        margin: 0px 0.5em 0px 0.5em;
      }
      #highlightr-footer span {
        color: black;
        font-weight: 600;
      }
      #highlightr-footer span:hover {
        text-decoration: underline;
      }
    </style>
    <footer id="highlightr-footer">&nbsp;
      <div>Personalized with <a href="http://www.highlightr.io"><span>highlightr.io</span></a> |<a href="${url}"> View Original</a></div>
    </footer>`);
    $('body').append($footer);
    console.log($.html());
    return $.html();
  }
}
