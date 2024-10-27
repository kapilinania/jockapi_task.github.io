const axios = require('axios');

module.exports = (db) => {
    const router = require('express').Router();

    // Fetch random jokes
    router.get('/random', async (req, res) => {
        try {
            const jokes = await Promise.all(
                Array.from({ length: 6 }).map(() =>
                    axios.get('https://icanhazdadjoke.com/', {
                        headers: { 'Accept': 'application/json' }
                    })
                )
            );
            res.json(jokes.map(joke => joke.data));
        } catch (error) {
            console.error('Error fetching random jokes:', error.message);
            res.status(500).json({ error: 'Error fetching random jokes', details: error.message });
        }
    });
    
    // Search for jokes
    router.get('/search', async (req, res) => {
        const term = req.query.term || '';
        try {
            const response = await axios.get(`https://icanhazdadjoke.com/search?term=${term}`, {
                headers: { 'Accept': 'application/json' }
            });
            res.json(response.data.results);
        } catch (error) {
            console.error('Error fetching jokes:', error);
            res.status(500).json({ error: 'Error fetching jokes' });
        }
    });

    // Save favourite joke
    router.post('/favourite', (req, res) => {
        const { joke_id, joke } = req.body;
        const image_url = `https://icanhazdadjoke.com/j/${joke_id}.png`; // Construct the image URL
        const query = 'INSERT INTO favourites (joke_id, joke, image_url) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE joke_id = joke_id';
        
        db.query(query, [joke_id, joke, image_url], (err, results) => {
            if (err) {
                console.error('Error saving favourite:', err);
                return res.status(500).json({ error: 'Error saving favourite' });
            }
            res.json({ id: results.insertId, joke_id, joke, image_url });
        });
    });

    // Fetch favorite jokes with images
    router.get('/favourites', (req, res) => {
        const query = 'SELECT joke_id, joke, image_url FROM favourites';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching favourites:', err);
                return res.status(500).json({ error: 'Error fetching favourites' });
            }
            res.json(results);
        });
    });

    // Remove favorite joke
    router.delete('/favourite/:id', (req, res) => {
        const joke_id = req.params.id;
        const query = 'DELETE FROM favourites WHERE joke_id = ?';

        db.query(query, [joke_id], (err, results) => {
            if (err) {
                console.error('Error removing favourite:', err);
                return res.status(500).json({ error: 'Error removing favourite' });
            }
            res.json({ message: 'Favorite joke removed successfully', joke_id });
        });
    });

    return router;
};
