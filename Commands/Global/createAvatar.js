const Discord = require("discord.js");

module.exports = {
  name: "mudaravatar",
  description: "Muda o avatar do bot para um GIF.",
  type: Discord.ApplicationCommandType.ChatInput,
  options: [
    {
      name: "file",
      description: "URL do GIF para o novo avatar",
      type: 11, // Defina o tipo como 11 para Attachment
      required: false,
    },
    {
      name: "url",
      description: "URL do GIF para o novo avatar",
      type: 3, // Defina o tipo como 3 para String
      required: false,
    },
  ],

  run: async (client, interaction) => {
    const url = interaction.options.getString("url");
    const file = interaction.options.getAttachment("file");

    if (file) {
      try {
        await client.user.setAvatar(file.url);
        await interaction.reply("Avatar atualizado com sucesso!");
      } catch (error) {
        console.error(error);
        await interaction.reply("Ocorreu um erro ao atualizar o avatar.");
      }
    } else if (url) {
      try {
        await client.user.setAvatar(url);
        await interaction.reply("Avatar atualizado com sucesso!");
      } catch (error) {
        console.error(error);
        await interaction.reply("Ocorreu um erro ao atualizar o avatar.");
      }
    } else {
      await interaction.reply(
        "Você deve fornecer um arquivo ou uma URL para o novo avatar."
      );
    }
  },
};
