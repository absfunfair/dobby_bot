fs = require('fs');

module.exports = {
  name: 'google',
	channels: [],
  description: 'Let me google that for you!',
	roles: [],
	async execute(message) {
				let search_term = message.content.substring("!google".length + 1, message.content.length)
				let search_uri = `https://lmgtfy.com/?q=${encodeURI(search_term)}&pp=1&iie=1`;
				message.channel.send(search_uri);
		}
}
