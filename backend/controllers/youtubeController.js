const axios = require('axios');

searchVideos = async (req, res) => {
    const searchQuery = req.query.q || 'react tutorials';
    const API_KEY = process.env.YOUTUBE_API_KEY;

    if (!API_KEY) {
        return res.status(500).send('API key is missing');
    }

    try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
            params: {
                part: 'snippet',
                key: API_KEY,
                q: searchQuery,
                videoEmbeddable: 'true',
                type: 'video',
                maxResults: 10
            }
        });

        res.json(response.data.items);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).send('Error fetching videos');
    }
};

module.exports = {searchVideos}
