import React, { useState } from 'react';
import axios from 'axios';

const Scraper = () => {
    const [url, setUrl] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setContent('');

        try {
            const response = await axios.post('/api/scrape', { url });
            setContent(response.data.content);
        } catch (err) {
            setError('Ошибка при получении данных');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                    placeholder="Введите URL"
                />
                <button type="submit">Получить информацию</button>
            </form>
            {content && (
                <div>
                    <h2>Полученная информация:</h2>
                    <pre>{content}</pre>
                </div>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Scraper;