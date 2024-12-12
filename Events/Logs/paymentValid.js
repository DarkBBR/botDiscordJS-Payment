const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'messageReactionAdd',
    execute: (client) => {
        client.on('messageReactionAdd', async (reaction, user) => {
            // Ler o ID da mensagem do arquivo
            const messageId = fs.readFileSync('messageId.txt', 'utf8');

            if (reaction.message.id === messageId && !user.bot) {
                if (reaction.emoji.name === '🇵🇹') {
                    reaction.message.channel.send(`${user} escolheu PIX como método de pagamento.`);
                } else if (reaction.emoji.name === '🇨🇦') {
                    reaction.message.channel.send(`${user} escolheu Cartão de Crédito como método de pagamento.`);
                }
            }
        });
    }
};
