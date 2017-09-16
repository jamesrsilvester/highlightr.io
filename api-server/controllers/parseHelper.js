const cheerio = require('cheerio'); // jQuery-like library for servers!

const randomString = function (inputString, outputLength) {
  if (outputLength < 1) return '';
  let hash = '';
  // TODO: make this awesome!
  while (hash.length < outputLength) {
    hash = Math.random().toString(36).slice(2);
  }
  return hash.slice(0, outputLength);
}

// TODO: Huh?
const base36 = function (num) {
  return num.toString(36)
}

module.exports = {
  getHighlights: (content) => {
    return ['TODO', 'write', 'getHighlights', 'method'];
  },
  getTitle: (content) => {
    const $ = cheerio.load(content);  // we can now treat our content string like the DOM
    title = $('title').first().text();
    if (title === '') {
      title = randomString(content, 8);
    }
    return title;
  }
}
