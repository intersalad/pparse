const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/scrape', async (req, res) => {
    const { url } = req.body;
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);
        const content = $('html').html(); // Получаем весь HTML-код
        res.json({ content });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка при получении данных' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});