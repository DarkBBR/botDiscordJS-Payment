const Discord = require('discord.js');
const cor = require('../../config').discord.color;

module.exports = {
  name: 'notificarloja',
  description: 'Envia uma notificação com os itens da loja do Fortnite',
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {
    try {
      await interaction.deferReply(); // Deferir a resposta

      const shopItems = await getFortniteShopItems();
      if (!shopItems.length) {
        await interaction.editReply('A loja do Fortnite está vazia no momento.');
        return;
      }

      const embed = new Discord.EmbedBuilder()
        .setColor(cor)
        .setTitle('Itens da Loja do Fortnite')
        .setDescription(shopItems.map(item => item.name).join('\n'))
        .setImage(shopItems[0].image_url); // Exemplo de imagem

      await interaction.editReply({ embeds: [embed] }); // Editar a resposta original
    } catch (error) {
      console.error('Erro ao buscar os itens da loja:', error);
      try {
        await interaction.editReply('Houve um erro ao buscar os itens da loja do Fortnite.');
      } catch (editError) {
        console.error('Erro ao editar a resposta:', editError);
      }
    }
  }
};

async function getFortniteShopItems() {
    try {
      const response = await axios.get('https://fortnite-api.com/v2/shop/br');
      console.log('API Response:', response.data); // Log da resposta da API
  
      if (response.status !== 200 || !response.data || !response.data.data || !response.data.data.entries) {
        throw new Error('Failed to fetch shop data');
      }
  
      return response.data.data.entries.map(item => ({
        name: item.items[0].name,
        image_url: item.items[0].images.icon,
      }));
    } catch (error) {
      console.error('Erro ao buscar os itens da loja:', error);
      throw new Error('Erro ao buscar os itens da loja');
    }
  }
  