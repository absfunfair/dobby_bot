fs = require('fs');
const Discord = require('discord.js');

module.exports = {
  name: 'google',
	channels: [],
  description: 'Let me google that for you!',
	roles: [],
	async execute(message) {
				let search_term = message.content.substring("!google".length + 1, message.content.length)
				let search_uri = `https://lmgtfy.com/?q=${encodeURI(search_term)}&pp=1&iie=1`;
				let embed = new Discord.MessageEmbed()
				.setTitle('Sorunun cevabını buradan bulabilirsin!')
				.setURL(search_uri)
				.setDescription("Biliyor musun google diye bir site var")
				.setAuthor("Google",'https://images.theconversation.com/files/93616/original/image-20150902-6700-t2axrz.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1000&fit=clip', "https://google.com");
				message.channel.send(embed);
		}
}
