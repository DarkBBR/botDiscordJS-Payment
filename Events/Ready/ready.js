require("colors");
const Discord = require("discord.js");

module.exports = {
  name: "ready",
  execute: (client) => {
    // client.on("ready", () => {
    //   console.log(`✅ Estou online em [${client.user.username}]`.green);
    // });
    client.on("ready", () => {
      const messages = [
        `🏆 Campeã do Valorant`, // Status 1
        `🏆 Campeã do Fortnite`, // Status 2
        `🏆 Campeã do Minecraft`, // Status 3
      ];

      var position = 0;

      setInterval(
        () =>
          client.user.setPresence({
            activities: [
              {
                name: `${messages[position++ % messages.length]}`,
                type: Discord.ActivityType.Streaming,
                url: "https://www.twitch.tv/bdarkbr_classic",
              },
            ],
          }),
        1000 * 10
      );

      client.user.setStatus("idle");
    });
  },
};
