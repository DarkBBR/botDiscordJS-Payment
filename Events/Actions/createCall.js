const Discord = require("discord.js");

module.exports = {
  name: "createCall",
  execute: (client) => {
    client.on("voiceStateUpdate", async (oldState, newState) => {
      const usuario = newState.guild.members.cache.get(newState.id);
      const canal = newState.guild.channels.cache.get("1313656678238912533");

      if (newState.channel?.id === canal.id) {
        const channel = await newState.guild.channels.create({
          name: `${usuario.displayName}' KINGDOM`, // Adicionando identificador
          parent: canal.parentId,
          type: Discord.ChannelType.GuildVoice,
          permissionOverwrites: [
            {
              id: usuario.id,
              allow: [
                Discord.PermissionsBitField.Flags.Connect,
                Discord.PermissionsBitField.Flags.ManageRoles,
                Discord.PermissionsBitField.Flags.ManageChannels,
              ],
            },
            {
              id: newState.guild.id,
              allow: [Discord.PermissionsBitField.Flags.Connect],
            },
          ],
        });
        await usuario.voice.setChannel(channel.id);
      }

      if (
        oldState.channel?.parentId === canal.parentId &&
        oldState.channel?.id !== canal.id &&
        oldState.channel?.members.size === 0 &&
        oldState.channel.name.endsWith("KINGDOM") // Verificar identificador
      ) {
        await oldState.channel.delete();
      }
    });
  },
};
