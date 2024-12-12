const forbiddenWords = [
  "NAZISTA",
  "KKK",
  "racista",
  "homofóbico",
  "sexista",
  "terrorista",
  "violência",
  "ódio",
  "discriminação",
  "preconceito",
  "assédio",
  "bullying",
  "intolerância",
  "extremismo",
  "xenofobia",
  "misoginia",
  "misandria",
  "pedofilia",
  "incitação",
  "ameaça",
];

module.exports = {
  name: "removePalavra",
  execute: (client) => {
    client.on("messageCreate", (message) => {
      if (!message.author.bot) {
        const containsForbiddenWord = forbiddenWords.some((word) =>
          message.content.toLowerCase().includes(word.toLowerCase())
        );
        if (containsForbiddenWord) {
          message
            .delete()
            .then(() => {
              message.channel.send(
                `${message.author}, sua mensagem foi removida por conter uma palavra proibida.`
              );
              console.log(
                `Mensagem de ${message.author.tag} removida: "${message.content}"`
              );
            })
            .catch((err) => console.error("Erro ao remover a mensagem:", err));
        }
      }
    });
  },
};
