import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const isCode = (text) => {
    const trimmedText = text.trim();
    return trimmedText.startsWith('```') || trimmedText.startsWith('**') || trimmedText.startsWith('***');
};

app.post('/generate', async (req, res) => {
    const { prompt } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const generatedText = await response.text();
        const codeResponse = isCode(generatedText);
        
        res.json({ generatedText, isCode: codeResponse });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (req, res) => {
    res.send('Hello World');
});
