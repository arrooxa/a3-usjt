require('dotenv').config()

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const { OpenAI } = require ('openai')

const openai = new OpenAI(OPENAI_API_KEY)

const express = require('express')
const app = express()

const PORT = 4000

app.use(express.json())

function defineGptSettings(prompt){
    return {
        messages: [{ role: 'user', content: prompt}],
        model: 'gpt-3.5-turbo',
        max_tokens: 40
    }
};

app.post('/ask-gpt', async (req, res) => {
    const { prompt } = req.body
    
    const completion = await openai.chat.completions.create(defineGptSettings(prompt));

    res.json({completion: completion.choices[0].message.content})
})

app.listen(PORT, () => console.log(`The application is running in ${PORT} port.`))