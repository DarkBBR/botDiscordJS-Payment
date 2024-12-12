const Discord = require("discord.js");
const { getGif } = require("../../api/giphy");
const cor = require("../../config").discord.color;
require("dotenv").config();

module.exports = {
  name: "gif",
  description: "Obtém um GIF aleatório ou de uma categoria específica do Giphy!",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: 'categoria',
      description: 'Categoria do GIF (ou deixe em branco para aleatório)',
      type: Discord.ApplicationCommandOptionType.String,
      required: false,
    }
  ],

  run: async (client, interaction) => {
    const category = interaction.options.getString('categoria') || 'random';

    try {
      const gifUrl = await getGif(category);

      const embed = new Discord.EmbedBuilder()
        .setColor(cor)
        .setAuthor({
          name: client.user.username,
          iconURL: client.user.displayAvatarURL(),
        })
        .setDescription(
          `🎉 Aqui está um GIF ${
            category === 'random' ? 'aleatório' : `da categoria **${category}**`
          } para você, **${interaction.user.username}**!`
        )
        .setImage(gifUrl);

      const row = new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setLabel("Baixar GIF")
          .setStyle(Discord.ButtonStyle.Link)
          .setURL(gifUrl)
      );

      interaction.reply({ embeds: [embed], components: [row] });
    } catch (error) {
      interaction.reply(
        "Não foi possível obter um GIF. Tente novamente mais tarde."
      );
    }
  },
};
