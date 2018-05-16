const imgur = require('imgur');

module.exports = function(redditData) {
  return new Promise((resolve, reject) => {
    const url_re = new RegExp(
      "(^|[ \t\r\n])((ftp|http|https|gopher|mailto|news|nntp|telnet|wais|file|prospero|aim|webcal):(([A-Za-z0-9$_.+!*(),;/?:@&~=-])|%[A-Fa-f0-9]{2}){2,}(#([a-zA-Z0-9][a-zA-Z0-9$_.+!*(),;/?:@&~=%-]*))?([A-Za-z0-9$_+!*();/?:~-]))"
      ,"g"
    );
    const img_re = new RegExp("https?:\/\/(m\.)?imgur\.com\/(a|gallery)\/(.*?)(?:[#\/].*|$)");
    const redditPost = redditData[0].data.children[0].data.selftext;
    const links = redditPost.match(url_re);

    for (const link of links) {
      if (link.includes('imgur.com')) {
        imgur.getAlbumInfo(link.match(img_re)[3])
        .then((json) => {
          resolve(json.data.images);
        })
        .catch((err) => {
          reject(err.message);
        });
      }
    }
  });
}
