const Discord = require("discord.js");

module.exports = {
  name: "mentioned",
  execute: (client) => {
    client.on("messageCreate", (message) => {
      if (message.author.bot) return;
      let mencoes = [`<@${client.user.id}>`, `<@!${client.user.id}>`];
      mencoes.forEach((element) => {
        if (message.content === element) {
          //(message.content.includes(element))
          let embed = new Discord.EmbedBuilder()
            .setColor("Random")
            .setAuthor({
              name: client.user.username,
              iconURL: client.user.displayAvatarURL({ dynaimc: true }),
            })
            .setDescription(
              `**Olá ${message.author}**, > **tudo bem? Ché o meu dono ta ocupado... :/ tenta mandar mensagem pra ele ou entrar na call que ele está! Caso queira conhecer contas premiuns e por um preço barato mande /loja**`
            );
          message.reply({ embeds: [embed] });
        }
      });
    });
  },
};
