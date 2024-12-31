const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/v1/chat', async (req, res) => {
    const { messages, model, apiKey } = req.body;

    try {
        const response = await fetch('https://api.google.com/gemini/v1/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({ messages, model }),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error communicating with the API:', error);
        res.status(500).json({ error: 'Error communicating with the API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});