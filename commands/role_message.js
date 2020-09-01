module.exports = {
  name: 'role_message',
	channels: ['737591023643131954'],
  description: 'Send the role message!',
	roles: ['737613419691376670', '737581522525356072'],
	async execute(message) {
        let message_new = await message.client.channels.cache.get("750443440713629696").send(`@Fr1nge Bu günden itibaren sunucuda çeşitli konularda eğitim verilecek. Bu eğitimlerde herkese bildirim gitmemesi açısından eğitimlere katılmak isteyenlere bir öğrenci rolü verilecek ve eğitim yapılacağı zaman sadece o role sahip kişilere bildirim gidecek. Öğrenci rolünü almak için aşağıdaki emojiye tıklayabilirsiniz. Bir gün öğrenci rolünü almaktan vazgeçerseniz emojinin üstüne tekrar tıklamanız yeterli :)`)
        Promise.all([
            message_new.react('📖')
        ])
        .catch(() => console.error('One of the emojis failed to react.'));
				message.delete()
		}
}
