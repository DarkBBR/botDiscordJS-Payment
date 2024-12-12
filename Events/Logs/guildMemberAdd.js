const Discord = require("discord.js");

module.exports = {
  name: "guildMemberAdd",
  execute: (client) => {
    client.on("guildMemberAdd", (member) => {
      let logChannel = "1184319568089464873";
      if (!logChannel) return;
      let embed = new Discord.EmbedBuilder()
        .setColor("Random")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .setTitle("_**SEJA MUITO BEM-VINDO(A) AO SERVIDOR!**_").setDescription(`
                  
                  ** > Olá ${member}
                  
                  Estamos muito felizes com a sua presença, e por você, especialmente você! Se tornar o novo membro desta comunidade incrível que só vem crescendo! \`${member.guild.name}\`
              
                  Junto com você somos o total de: ${member.guild.memberCount}. Se divirta, e não esqueça de olhar as regras do servidor!**
                  
                  `);

      member.guild.channels.cache
        .get(logChannel)
        .send({ embeds: [embed], content: `${member}` });
    });
  },
};
