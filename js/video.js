const reqURL =
  'https://api.rss2json.com/v1/api.json?rss_url=' +
  encodeURIComponent('https://www.youtube.com/feeds/videos.xml?channel_id=');
function loadVideo(iframe) {
  $.getJSON(reqURL + iframe.getAttribute('cid'), function (data) {
    const videoNumber = iframe.getAttribute('vnum')
      ? Number(iframe.getAttribute('vnum'))
      : 0;
    // console.log(videoNumber);
    const link = data.items[videoNumber].link;
    id = link.substr(link.indexOf('=') + 1);
    iframe.setAttribute(
      'src',
      'https://youtube.com/embed/' + id + '?controls=1'
    );
  });
}
const iframes = document.getElementsByClassName('latestVideoEmbed');
for (var i = 0, len = iframes.length; i < len; i++) {
  loadVideo(iframes[i]);
}
