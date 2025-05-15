const { Groq } = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const groqSummary = async (req, res) => {
    const { entry } = req.body;

    if (!entry) {
        return res.status(400).json({ error: 'Entry is required' });
    }

    try {
        const getGroqChatCompletion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: 'system', content: 'You summarize journal entries.' },
                { role: 'user', content: `Summarize this journal entry in 1 sentence in the point of view of the person who wrote it:\n\n${entry}` },
            ],
        })

        const summary = getGroqChatCompletion.choices[0].message.content.trim();
        res.status(200).json({ summary });
    } catch (err) {
        console.error('GROQ summary error:', err.message);
        res.status(500).json({ error: 'Failed to generate summary.' });
    }
}

module.exports = { groqSummary }