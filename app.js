var
	superagent = require('superagent'),
	url = require('url'),
	request = require('request'),
	fs = require('fs'),
	CronJob = require('cron').CronJob;

var config = require('./config.js');

// idx: starting date to today
// n: count of days from idx back
var jasonUrl = config.jasonUrl,
	baseUrl = config.baseUrl,
	seconds = config.seconds,
	minutes = config.minutes,
	hours = config.hours,
	months = config.months,
	days = config.days,
	weeks = config.weeks;

function saveImage(imageUrl) {
	superagent.get(imageUrl)
		.end(function(err, res) {
			if(err) {
				return console.log(err);
			}

			var contents = JSON.parse(res.text);
			var imageUrl = contents.images[0].url;
			var imageName = imageUrl.split('/').slice(-1).pop();
			var fullImageURL = baseUrl + imageUrl

			request.get(fullImageURL).on('response', function(response) {
				if(response.statusCode !== 200) {
					return console.log(response);
				}
			}).pipe(fs.createWriteStream('./images/' + imageName));
		});
}

// runs at 23:59 PM. every day
var job = new CronJob({
	cronTime: seconds + ' ' + minutes + ' ' + hours + ' ' + months + ' ' + days + ' ' + weeks,
	onTick: function() {
		saveImage(jasonUrl);
	},
	function() {
		console.log('Task stopped!');
	},
	start: false
});
job.start();
console.log(seconds + ' ' + minutes + ' ' + hours + ' ' + months + ' ' + days + ' ' + weeks);