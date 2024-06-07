// controllers/jobController.js

import axios from 'axios';

export const getJobListings = async (req, res) => {
    try {
        const response = await axios.get('https://jobs.github.com/positions.json?description=react+node&location=india');
        const jobs = response.data;
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching job listings:', error);
        res.status(500).json({ error: 'An error occurred while fetching job listings.' });
    }
};
