fs = require('fs');

module.exports = {
  name: 'role_message',
	channels: [],
  description: 'Send the role message!',
	roles: ['737613419691376670', '737581522525356072'],
	async execute(message) {
				console.log(message.toString());
				let message_data = message.content.substring("!role_message".length + 1, message.content.length).split("[END]")[0] 
        let message_new = await message.channel.send(`@everyone ` + message_data)
				let emojis = message.content.split("[END]")[1].trim().split(",")
				let promises = []
				for(var i = 0; i < emojis.length; i++){
					promises.push(message_new.react(emojis[i]));
				}
        Promise.all(promises).catch(() => console.error('One of the emojis failed to react.'));
				var config = JSON.parse(fs.readFileSync('config.json').toString());
				config.role_message.push([message_new.channel.id, message_new.id])
				fs.writeFileSync('config.json', JSON.stringify(config));
				message.delete()
		}
}
