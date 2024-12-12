// api/giphy.js
const axios = require('axios');
require('dotenv').config();

async function getGif(category = 'random') {
    try {
        const endpoint = category === 'random' 
            ? 'https://api.giphy.com/v1/gifs/random' 
            : 'https://api.giphy.com/v1/gifs/search';
        
        const params = {
            api_key: process.env.GIPHY_API_KEY
        };

        if (category !== 'random') {
            params.q = category;
            params.limit = 1;
        }

        const response = await axios.get(endpoint, { params });
        const gifUrl = category === 'random'
            ? response.data.data.images.original.url
            : response.data.data[0].images.original.url;

        return gifUrl;
    } catch (error) {
        console.error('Erro ao obter GIF:', error);
        throw new Error('Não foi possível obter um GIF.');
    }
}

module.exports = { getGif };
