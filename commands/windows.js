fs = require('fs');

module.exports = {
  name: 'windows',
	channels: [],
  description: 'Let me google that for you!',
	roles: [],
	async execute(message) {
		message.channel.send("Windows kullanan da ne biliyim");
	}
}
