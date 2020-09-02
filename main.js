const fs = require('fs')
const Discord = require('discord.js');
const Client = require('./client');

const {
    prefix,
    token,
    role_message,
		guild_to_role
} = require('./config.json');

const client = new Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    let prefix = ""
    if(!command.name) continue;
    if(command.family){
        prefix = command.family + "_"
    }
    client.commands.set(prefix + command.name, command);
}

console.log(client.commands);

client.once('ready', async () => {
	for(let i = 0; i < role_message.length; i++){
	  channel = client.channels.cache.get(role_message[i][0]);
		message_manager = channel.messages;
		message_manager.fetch(role_message[i][1]);
	}
	console.log('Ready!');
});

client.once('reconnecting', () => {
    console.log('Reconnecting!');
});

client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on('message', async message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const c1 = args.shift().toLowerCase();
    let c2 = args.shift();
    if(c2){
        c2 = c2.toLowerCase()
    }
    var commandName = null;

    if (client.commands.has(c1)){
        commandName = c1;
    }else if(client.commands.has(c1 + "_" + c2)){
        commandName = c1 + "_" + c2;
    }else{
        return;
    }

    const command = client.commands.get(commandName);
    const permitted_roles = client.commands.get(commandName)["roles"];
    const permitted_channels = client.commands.get(commandName)["channels"]

    has_roles = false

    if (permitted_roles){
        for(i = 0; i < permitted_roles.length; i++){
            if(message.member.roles.cache.has(permitted_roles[i])){
                has_roles = true
            }
        }

        if (!has_roles && message.author.id != "440823026523832322"){
            message.reply('You are not allowed to run this command!');
            return;
        }
    }

    if(permitted_channels){
        msg_channel = message.channel;
        channel_allowed = false
        for(i = 0; i < permitted_channels.length; i++){
            if(permitted_channels[i] == "dm" && msg_channel instanceof Discord.DMChannel){
                channel_allowed = true;
                break;
            }else if(permitted_channels[i] == msg_channel.id){
                channel_allowed = true;
                break;
            }
        }

        if(!channel_allowed && permitted_channels != 0){
            return;
        }
    }

    try {
        command.execute(message,args);
    } catch (error) {
        console.error(error);
        message.reply('There was an error trying to execute that command!');
    }
});

client.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.log('Something went wrong when fetching the message: ', error);
        return;
			}
    }

    let emoji = reaction.emoji.name;
    let member = await reaction.message.guild.members.fetch(user.id);
		let message = reaction.message;

		let role = guild_to_role[message.guild.id][0];
		let notifier = guild_to_role[message.guild.id][1];
		if(!role){
			role = guild_to_role[message.guild.id][emoji][0];
			notifier = guild_to_role[message.guild.id][emoji][1];	
		}
  	member.roles.add(role)
	  user.send(notifier)
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (reaction.partial) {
        try {
          await reaction.fetch();
        } catch (error) {
          console.log('Something went wrong when fetching the message: ', error);
          return;
        }
    }
    let emoji = reaction.emoji.name;
    let member = await reaction.message.guild.members.fetch(user.id);
		let message = reaction.message;
		let role = guild_to_role[message.guild.id][0];
		let notifier = guild_to_role[message.guild.id][2];
		if(!role){
			role = guild_to_role[message.guild.id][emoji][0];
			notifier = guild_to_role[message.guild.id][emoji][2];	
		}
  	member.roles.remove(role)
	  user.send(notifier)
});

// login to Discord with your app's token
client.login(token);
