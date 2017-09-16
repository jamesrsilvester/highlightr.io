const cheerio = require('cheerio'); // jQuery-like library for servers!

const randomString = function (inputString, outputLength) {
  if (outputLength < 1) return '';
  let hash = '';
  while (hash.length < outputLength) {
    hash = Math.random().toString(36).slice(2);
  }
  return hash.slice(0, outputLength);
}

module.exports = {
  getHighlights: (content) => {
    const $ = cheerio.load(content);
    highlights = [];
    // for each .highlightr span, grab the text and push it to our array
    $('.highlightr').each((i, el) => highlights.push($(el).text()));
    return highlights;
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
