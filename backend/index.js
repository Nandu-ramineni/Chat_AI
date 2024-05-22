import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import Router from './Routes/Route.js';
import { Connection } from './Database/db.js';
import bodyParser from 'body-parser';
dotenv.config();
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use('/',Router);
const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const URI=process.env.MONGODB_URI || `mongodb+srv://${USERNAME}:${PASSWORD}@file.hng0fkz.mongodb.net/?retryWrites=true&w=majority&appName=file`
Connection(URI);
const isCode = (text) => {
    const trimmedText = text.trim();
    return trimmedText.startsWith('```');
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
