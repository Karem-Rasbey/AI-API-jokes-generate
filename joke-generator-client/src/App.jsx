import { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file for styling

function App() {
    const [jokes, setJokes] = useState([]);  // Store multiple jokes
    const [keyword, setKeyword] = useState('');
    const [error, setError] = useState('');

    // Function to fetch jokes based on the keyword
    const fetchJokes = async () => {
        if (keyword.trim() === '') {
            setError('Please enter a keyword.');
            return;
        }

        setError('');  // Clear any previous error message before making the API request

        try {
            // Send the keyword as a query parameter to the backend
            const response = await axios.get(`http://localhost:5000/api/joke?keyword=${keyword}`);
            
            if (response.data.jokes && response.data.jokes.length > 0) {
                setJokes(response.data.jokes);  // Update the state with new jokes
            } else {
                setError('No jokes found for this keyword.');
                setJokes([]);  // Clear any old jokes if no jokes are found
            }
        } catch (error) {
            console.error('Error fetching jokes:', error);
            setError('Sorry, there was an error fetching the jokes.');
            setJokes([]);  // Clear jokes on error
        }
    };

    return (
        <div className="App">
            <div className="container">
                <h1 className="title">Joke Generator</h1>
                <input
                    type="text"
                    className="input"
                    placeholder="Enter a keyword (e.g., developer)"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}  // Update the keyword state
                />
                <button className="button" onClick={fetchJokes}>Get a Joke</button>
                {error && <p className="error">{error}</p>}
                <div className="jokes-container">
                    {jokes.map((joke, index) => (
                        <div key={index} className="joke">
                            {joke.setup && <p><strong>Setup:</strong> {joke.setup}</p>}
                            {joke.delivery && <p><strong>Punchline:</strong> {joke.delivery}</p>}
                            {!joke.setup && <p><strong>Joke:</strong> {joke.joke}</p>}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
