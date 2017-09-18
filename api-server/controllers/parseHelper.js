const cheerio = require('cheerio'); // jQuery-like library for servers!

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
  addFooter: (content, url) => {
    const $ = cheerio.load(content);
    const $footer = $(`
    <style>
      footer#highlightr-footer {
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
    </style>
    <footer id="highlightr-footer">&nbsp;
      <div><a href="${url}">${url}</a></div>
      <div style="float: right;"><a href="https://highlightr.io">highlightr.io</a></div>
    </footer>`);
    $('body').append($footer);
    console.log($.html());
    return $.html();
  }
}
