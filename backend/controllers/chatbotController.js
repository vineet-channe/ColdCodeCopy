const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

getAnswer = async (req, res) => {
    try {
        let { query } = req.body;

        if (!query) {
            return res.status(400).send('Query is required');
        }
        query += " ( note - give response in html format in <html></html> tag, For any code snippets, wrap them in <pre><code></code></pre> tags)";
        const result = await model.generateContent(query);
        const answer = await result.response.text();
        console.log(answer)

        res.json({ answer });
    } catch (error) {
        console.error('Error generating content:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {getAnswer}