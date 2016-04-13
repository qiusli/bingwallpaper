var superagent = require('superagent'),
	url = require('url');

var jsonURL = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1";
var baseURL = "http://www.bing.com";

superagent.get(jsonURL)
	.end(function(err, res) {
		if(err) {
			return console.log(err);
		}

		var contents = JSON.parse(res.text);
		var imageUrl = contents.images[0].url;
		var fullImageURL = baseURL + imageUrl
		console.log(fullImageURL);
	});