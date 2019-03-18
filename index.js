require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
var request = require("request");

const token = process.env.token;
var rrLinks = [/https?:\/\/\S*Rick.*Astley\S*/i,/dQw4w9WgXcQ/i,/oHg5SJYRHA0/i,/DLzxrzFCyOs/i,/okqEVeNqBhc/i,/6_b7RDuLwcI/i,/V-_O7nl0Ii0/i,/TzXXHVhGXTQ/i,/vLRyJ0dawjM/i,/dJRsWJqDjFE/i,/IdkCEioCp24/i,/jKLzwUggKDI/i,/cyMHZVT91Dw/i,/a9WHZ5M8I8w/i,/oXXLMOVYZs/i,/ghGoI7xVtSI/i,/IO9XlQrEt2Y/i,/hVPE47krnMY/i,/RRY4SVsGhLs/i,/AyOqGRjVtls/i,/https?:\/\/www.latlmes.com\/arts\/return-of-the-golden-age-of-comics-1/i,/dGeEuyG_DIc/i,/oVTPg9iicy4/i,/lXMskKTw3Bc/i,/SQoA_wjmE9w/i,/1IcSJ6K/i,/Gc2u6AFImn8/i,/aWkhsM699VY/i];
var detectedRickRoll = '<:[!]:> RICK ROLL DETECTED'
var warningRickRoll = 'Don\'t open that! It\'s a Rick Roll link! _Never gonna let them Rick Roll you ..._'
var detectedMokryLink = '<:[!]:> DETECTED MOKRY SENDING A URL'
// var warningMokry = 'Be careful when Mokry sends links! This one looks alright, I think it\'s safe to open, but this guy is known for Rick Rolling. _Never gonna let them Rick Roll you ..._'

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}`);
	client.user.setActivity('Never gonna let them Rick Roll you');
})

client.on('message', msg => {
	var isRickRoll = false;
	var isMokry = false;

	// console.log('#' + msg.channel.name + ' - ' + msg.member.user.username + ' - ' + '(' + msg.member.user.id + ')' + ':');
	// console.log(msg.member.user.id);
	// console.log('  ' + msg.content);

	var msgURL = msg.content.match(/https?:\/\/[A-Za-z0-9]+\.\S{2,}(?=\s|>|$)/i);

	if (msgURL) {
		console.log('---- MESSAGE CONTAINS URL: ' + msgURL[0]);
	}

	// first test
	for (var i = 0; i <= rrLinks.length - 1; i++) {
		if (rrLinks[i].test(msg.content)) {
			isRickRoll = true;
			console.log(detectedRickRoll);
			msg.channel.send(warningRickRoll);
			break;
		}
	}

	// second test
	if (isRickRoll === false && msgURL) {
		request({url: msgURL[0], followRedirect: false}, function(error, response, body) {
			// console.log(response.statusCode);
			if (response && response.statusCode >= 300 && response.statusCode < 400) {
				for (var i = 0; i <= rrLinks.length - 1; i++) {
					if (rrLinks[i].test(response.headers.location)) {
						isRickRoll = true;
						console.log(detectedRickRoll + ': ' + response.headers.location);
						msg.channel.send(warningRickRoll);
						break;
					}
				}
			}
		});
	}

	// if (msg.member.user.id === '500382262882467851') {
	// 	isMokry = true;
	// }

	// if (!(isRickRoll) && isMokry && msgURL) {
	// 	console.log(detectedMokryLink);
	// 	msg.channel.send(warningMokry);
	// }
})

client.login(token);