const Discord = require("discord.js");

module.exports = {
  name: "clear",
  description: "Limpe um número específico de mensagens do chat.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "quantidade",
      type: Discord.ApplicationCommandOptionType.Integer,
      description: "Número de mensagens a serem deletadas (1-100)",
      required: true,
    },
  ],

  run: async (client, interaction) => {
    const quantidade = interaction.options.getInteger("quantidade");

    if (quantidade < 1 || quantidade > 100) {
      return interaction.reply({
        content: "Por favor, insira um número entre 1 e 100.",
        ephemeral: true,
      });
    }

    const fetched = await interaction.channel.messages.fetch({
      limit: quantidade,
    });

    interaction.channel
      .bulkDelete(fetched)
      .then((deleted) => {
        const embed = new Discord.EmbedBuilder()
          .setColor("Random")
          .setAuthor({
            name: client.user.username,
            iconURL: client.user.displayAvatarURL(),
          })
          .setDescription(
            `🧹 ${interaction.user.username} limpou \`${deleted.size}\` mensagens.`
          );

        interaction.reply({ embeds: [embed] });
      })
      .catch((error) => {
        console.error("Erro ao deletar mensagens: ", error);
        interaction.reply({
          content: "Ocorreu um erro ao tentar deletar mensagens no canal.",
          ephemeral: true,
        });
      });
  },
};
