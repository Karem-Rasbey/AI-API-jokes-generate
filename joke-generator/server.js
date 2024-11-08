const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 5000;

// Enable CORS for all routes
app.use(cors());

// Route to fetch jokes based on a keyword
app.get('/api/joke', async (req, res) => {
    const keyword = req.query.keyword || 'Any';  // Default to 'Any' if no keyword is provided
    try {
        // Fetch joke(s) from JokeAPI using the keyword in the query
        console.log('Fetching jokes for keyword:', keyword); // Add log for debugging
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Any`, {
            params: {
                type: 'twopart',  // Ensure the joke type is two-part (setup/punchline)
                contains: keyword,  // Filter jokes by keyword
                lang: 'en',
                amount: 3  // Request multiple jokes
            }
        });

        // Check if jokes are returned
        if (response.data && response.data.jokes) {
            res.json({ jokes: response.data.jokes });
        } else if (response.data && response.data.joke) {
            res.json({ jokes: [response.data] }); // If only one joke is returned, convert it to an array
        } else {
            res.json({ jokes: [] }); // No jokes found
        }
    } catch (error) {
        console.error(error);  // Add logs to debug the error
        res.status(500).send('Something went wrong');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
