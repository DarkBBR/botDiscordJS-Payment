const axios = require('axios');
const { ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: 'minecraft-corpo',
    description: 'Obter informações do jogador do Minecraft',
    options: [
        {
            name: 'username',
            description: 'Nome de usuário do Minecraft',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
    ],

    run: async (client, interaction) => {
        const username = interaction.options.getString('username');

        try {
            const response = await axios.get(`https://vulpapi.squareweb.app/minecraft/${username}`);

            if (response.data.status === 'success') {
                const { mcBody } = response.data.response;
                await interaction.reply({ content: `${mcBody}` });
            } else {
                const errorResponse = response.data;

                if (errorResponse.status === 'error') {
                    const errorMessage = errorResponse.message || 'Erro desconhecido ao processar a solicitação.';
                    await interaction.reply(errorMessage);
                } else {
                    await interaction.reply('Erro desconhecido ao processar a solicitação.');
                }
            }
        } catch (error) {
            console.error('Erro ao processar a solicitação:', error.message);

            if (error.response) {
                const status = error.response.status;

                switch (status) {
                    case 404:
                        await interaction.reply('Usuário não encontrado.');
                        break;
                    case 429:
                        await interaction.reply('Limite de solicitações atingido. Aguarde um momento e tente novamente.');
                        break;
                    case 401:
                        await interaction.reply('Não autorizado a acessar as informações do jogador.');
                        break;
                    default:
                        await interaction.reply('Erro ao processar a solicitação.');
                }
            } else {
                await interaction.reply('Erro ao processar a solicitação.');
            }
        }
    },
};
