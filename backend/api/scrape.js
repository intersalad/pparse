import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { url } = req.body;
        try {
            const response = await axios.get(url);
            const $ = cheerio.load(response.data);
            const content = $('html').html(); // Получаем весь HTML-код
            res.status(200).json({ content });
        } catch (error) {
            res.status(500).json({ error: 'Ошибка при получении данных' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Метод ${req.method} не разрешен`);
    }
}
