import express from 'express';
import axios from 'axios';
const router = express.Router();

router.get('/', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: 'query param q is required' });
  try {
    const response = await axios.get('https://api.unsplash.com/search/photos', {
      params: { query: q, per_page: 1, orientation: 'landscape', client_id: process.env.UNSPLASH_ACCESS_KEY },
    });
    const photo = response.data.results?.[0];
    res.json({ url: photo?.urls?.regular || null });
  } catch (err) {
    console.error('Unsplash error:', err.response?.data || err.message);
    res.status(500).json({ message: 'Image fetch failed' });
  }
});

export default router;
