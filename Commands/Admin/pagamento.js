const Discord = require('discord.js');
const cor = require('../../config').discord.color;

module.exports = {
    name: 'criarembed', // Nome do comando
    description: 'Cria uma embed personalizada com imagem, título, descrição, valor e botões.', // Descrição do comando
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'título',
            description: 'Título da embed.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'descrição',
            description: 'Descrição da embed.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'valor',
            description: 'Valor a ser exibido na embed.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: 'chat',
            description: 'Canal onde a embed será enviada.',
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true,
        },
        {
            name: 'cor',
            description: 'Cor da embed em hexadecimal.',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'footer',
            description: 'Texto do rodapé.',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'timestamp',
            description: 'Adicionar data e hora.',
            type: Discord.ApplicationCommandOptionType.Boolean,
            required: false,
        },
        {
            name: 'imagem',
            description: 'Anexar uma imagem para a embed.',
            type: Discord.ApplicationCommandOptionType.Attachment,
            required: false,
        },
        {
            name: 'imagem_posição',
            description: 'Escolha a posição da imagem (direita ou abaixo).',
            type: Discord.ApplicationCommandOptionType.String,
            required: false,
            choices: [
                {
                    name: 'Direita',
                    value: 'right',
                },
                {
                    name: 'Abaixo',
                    value: 'bottom',
                },
            ],
        },
    ],

    run: async (client, interaction) => {
        // Verificação de permissões
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            return interaction.reply({
                content: `Você não possui permissão para utilizar este comando.`,
                ephemeral: true,
            });
        }

        // Coletar as opções do comando
        let titulo = interaction.options.getString('título');
        let descricao = interaction.options.getString('descrição');
        let valor = interaction.options.getString('valor');
        let cor = interaction.options.getString('cor') || cor;
        let footer = interaction.options.getString('footer');
        let timestamp = interaction.options.getBoolean('timestamp');
        let imagem = interaction.options.getAttachment('imagem');
        let imagemPosicao = interaction.options.getString('imagem_posição');
        let chat = interaction.options.getChannel('chat');

        if (Discord.ChannelType.GuildText !== chat.type) {
            return interaction.reply(`❌ Este canal não é um canal de texto para enviar uma mensagem.`);
        }

        // Criar a embed
        let embed = new Discord.EmbedBuilder()
            .setTitle(titulo)
            .setDescription(descricao)
            .setColor(cor)
            .addFields({ name: 'Valor', value: valor });
        
        if (footer) embed.setFooter({ text: footer });
        if (timestamp) embed.setTimestamp();

        if (imagem) {
            if (imagemPosicao === 'right') {
                embed.setThumbnail(imagem.url);
            } else {
                embed.setImage(imagem.url);
            }
        }

        // Criar os botões
        const row = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('pix:'+ valor)
                    .setLabel('Pagar com PIX')
                    .setStyle(Discord.ButtonStyle.Primary),
                // new Discord.ButtonBuilder()
                //     .setCustomId('cartao:'+ valor)
                //     .setLabel('Pagar com Cartão de Crédito')
                //     .setStyle(Discord.ButtonStyle.Secondary)
            );

        // Enviar a embed com os botões
        chat.send({ embeds: [embed], components: [row] })
            .then(() => {
                interaction.reply({
                    content: `✅ Sua embed foi enviada em ${chat} com sucesso.`,
                    ephemeral: true,
                });
            })
            .catch((e) => {
                interaction.reply(`❌ Algo deu errado ao enviar a embed.`);
                console.error(e);
            });
    },
};
