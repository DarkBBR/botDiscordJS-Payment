const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const { MatchPairs, TicTacToe } = require("discord-gamecord");

module.exports = {
  name: "jogo-da-memoria",
  description: "Memory Game.",
  options: [
    {
      name: "emojis",
      description: "Memory Game.",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "frutas-verduras",
          value: "100",
        },
        {
          name: "bandeira",
          value: "10",
        },
        {
          name: "carros",
          value: "11",
        },
        {
          name: "comida",
          value: "12",
        },
        {
          name: "coração",
          value: "13",
        },
      ],
    },
  ],
  run: async (client, interaction, args) => {
    let emojis = interaction.options.getString("emojis");

    if (emojis === "100") {
      const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "``frutas verduras Memory``",
          color: "#bd6930",
          description:
            "Clique nos retangulos e tente ganhar em menos clicks possíveis!",
        },
        timeoutTime: 6000,
        emojis: [
          "🍉",
          "🍇",
          "🍊",
          "🥭",
          "🍎",
          "🍏",
          "🥝",
          "🥥",
          "🍓",
          "🫐",
          "🍍",
          "🥕",
          "🥔",
        ],
      });

      Game.startGame();
    } else if (emojis === "10") {
      const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "``Bandeiras Memory``",
          color: "#bd6930",
          description:
            "Clique nos retangulos e tente ganhar em menos clicks possíveis!",
        },
        timeoutTime: 6000,
        emojis: [
          "🇨🇴",
          "🇨🇵",
          "🇨🇷",
          "🇧🇲",
          "🇧🇱",
          "🇧🇷",
          "🇧🇴",
          "🇧🇳",
          "🇸🇱",
          "🇯🇲",
          "🇻🇳",
          "🇧🇬",
          "🇭🇳",
        ],
      });

      Game.startGame();
    } else if (emojis === "11") {
      const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "``Veiculos Memory``",
          color: "#bd6930",
          description:
            "Clique nos retangulos e tente ganhar em menos clicks possíveis!",
        },
        timeoutTime: 6000,
        emojis: [
          "🚗",
          "🚓",
          "🚕",
          "🛺",
          "🚙",
          "🚌",
          "🚐",
          "🚎",
          "🚑",
          "🚚",
          "🚘",
          "🚛",
          "🚔",
        ],
      });

      Game.startGame();
    } else if (emojis === "12") {
      const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "``comida Memory``",
          color: "#bd6930",
          description:
            "Clique nos retangulos e tente ganhar em menos clicks possíveis!",
        },
        timeoutTime: 6000,
        emojis: [
          "🍕",
          "🍔",
          "🍟",
          "🌭",
          "🍿",
          "🥓",
          "🧇",
          "🥞",
          "🧈",
          "🍞",
          "🥐",
          "🥨",
          "🥯",
        ],
      });

      Game.startGame();
    } else if (emojis === "13") {
      const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
          title: "``Coração Memory``",
          color: "#bd6930",
          description:
            "Clique nos retangulos e tente ganhar em menos clicks possíveis!",
        },
        timeoutTime: 6000,
        emojis: [
          "❤",
          "🧡",
          "💛",
          "💚",
          "💙",
          "💜",
          "🤎",
          "🖤",
          "🤍",
          "💔",
          "💗",
          "💝",
          "💓",
        ],
      });

      Game.startGame();

      if (!interaction.guild.members.me.permissions.has("Administrador"))
        return interaction.reply(
          "Parece que estou sem permissões suficientes!"
        );
    }
  },
};
