fs = require('fs');
const Discord = require('discord.js');

module.exports = {
  name: 'ddg',
	channels: [],
  description: 'Let me google that for you!',
	roles: [],
	async execute(message) {
				let search_term = message.content.substring("!ddg".length + 1, message.content.length)
				let search_uri = `https://lmgtfy.com/?q=${encodeURI(search_term)}&pp=1&iie=1&s=d`;
				let embed = new Discord.MessageEmbed()
				.setTitle('Sorunun cevabını buradan bulabilirsin!')
				.setURL(search_uri)
				.setDescription('Biliyor musun duckduckgo diye bir şey var')
				.setAuthor('DuckDuckGo', "https://images.techhive.com/images/article/2014/05/duckduckgo-logo-100266737-large.jpg", "https://duckduckgo.com");
				message.channel.send(embed);
		}
}
