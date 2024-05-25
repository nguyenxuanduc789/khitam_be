'use strict'
const { Client, GatewayIntentBits } = require('discord.js')
const {
    CHANNEL_ID_DISCORD,
    TOKEN_DISCORD
} = process.env

class LoggerService {
    constructor() {
        this.client = new Client({
            intents: [
                GatewayIntentBits.DirectMessages,
                GatewayIntentBits.Guilds,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent
            ]
        })
        this.channelId = CHANNEL_ID_DISCORD,
        this.client.on('ready', () => {
            console.log((`logged is as ${this.client.user.tag} !`))
        })
        this.client.login(TOKEN_DISCORD)
    }
    
    sendToMessage(message = 'message') {
        const channel = this.client.channels.cache.get(this.channelId)
        if (!channel) {
            console.error("Could't find the channel.......", this.channelId);
        }
        channel.send(message).catch(e => console.error(e))

    }
    sendToFormatCode(logData) {
        const { code, message = 'This is some additional information about the code.', title = 'Code Example' } = logData;
        const codeMessage = {
            content: message,
            embeds: [
                {
                    color: parseInt('00ff00', 16),
                    title,
                    description: '```json\n' + JSON.stringify(code, null, 2) + '\n ```'
                }
            ]
        }
        this.sendToMessage(codeMessage)
    }

    
}
//const loggerService = new LoggerService();
module.exports = new LoggerService();