const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/v1/chat', async (req, res) => {
    const { messages, apiKey } = req.body;

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = messages.map(msg => msg.content).join('\n');
        const result = await model.generateContent(prompt);

        res.json({ choices: [{ message: { content: result.response.text() } }] });
    } catch (error) {
        console.error('Error communicating with the API:', error);
        res.status(500).json({ error: 'Error communicating with the API' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});