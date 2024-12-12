const Discord = require("discord.js");

module.exports = {
  name: "add-emoji",
  description: "Adicionar emoji",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "attachment",
      description: "Arquivo de anexo",
      type: Discord.ApplicationCommandOptionType.Attachment,
      required: true,
    },
    {
      name: "name",
      description: "Selecionar nome do emoji",
      type: Discord.ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  async run(client, interaction) {
    if (
      !interaction.member.permissions.has(
        Discord.PermissionFlagsBits.Administrator
      )
    ) {
      return interaction.reply({
        content: "Você não tem permissão para executar este comando.",
        ephemeral: true,
      });
    }

    const upload = interaction.options.getAttachment("attachment");
    const name = interaction.options.getString("name");

    await interaction.reply({ content: ":loading: Carregando emoji..." });

    try {
      const emoji = await interaction.guild.emojis.create({
        attachment: upload.url,
        name: name,
      });

      let thumbnailUrl = emoji.animated
        ? `https://cdn.discordapp.com/emojis/${emoji.id}.gif?v=1`
        : `https://cdn.discordapp.com/emojis/${emoji.id}.png?v=1&size=64`;

      const embed = new Discord.EmbedBuilder()
        .setColor("#8C9FFF")
        .setDescription(`${emoji} | Adicionado no servidor!`)
        .setThumbnail(thumbnailUrl)
        .setTimestamp();

      await interaction.editReply({ content: "", embeds: [embed] });
    } catch (err) {
      console.error(err);
      await interaction.editReply({ content: `Erro: ${err.message}` });
    }
  },
};
