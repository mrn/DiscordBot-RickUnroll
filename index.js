require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
var request = require("request");

const token = process.env.token;
var rrLinks = ['dQw4w9WgXcQ','oHg5SJYRHA0','DLzxrzFCyOs','oVTPg9iicy4','lXMskKTw3Bc','SQoA_wjmE9w','https://bit.ly/1IcSJ6K'];
var rrDetected = 'Rick Roll detected'
var rrWarning = 'Don\'t open that! It\'s a Rick Roll link!'

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity('Never gonna let them Rick Roll you');
})

client.on('message', msg => {
	var isRickRoll = false;

	var msgUrl = msg.content.match(/http\S*?(?=\s|>|$)/i);
	if (msgUrl) {
		console.log(msgUrl[0]);
	}

	// first test
	for (var i = 0; i <= rrLinks.length - 1; i++) {
		if (msg.content.includes(rrLinks[i])) {
			isRickRoll = true;
			console.log(rrDetected);
			msg.channel.send(rrWarning);
			break;
		}
	}
	// console.log(isRickRoll);

	// second test
	if (isRickRoll == false && msgUrl) {
		request({url: msgUrl[0], followRedirect: false}, function(error, response, body) {
			// console.log(response.statusCode);
			if (response && response.statusCode >= 300 && response.statusCode < 400) {
				for (var i = 0; i <= rrLinks.length - 1; i++) {
					if (response.headers.location.includes(rrLinks[i])) {
						isRickRoll = true;
						console.log(rrDetected);
						msg.channel.send(rrWarning);
						break;
					}
				}
				console.log(response.headers.location);
			}
		});
	}
})

client.login(token);