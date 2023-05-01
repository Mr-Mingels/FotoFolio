const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser')
const path = require('path');


dotenv.config();

const app = express();
app.use(cors({ origin: 'https://foto-folio.herokuapp.com/' }));
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});




const PORT = process.env.PORT || 3001;

const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const PIXABAY_API_BASE_URL = 'https://pixabay.com/api';

const cache = {}; // Simple in-memory cache
const cacheExpiration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q;
    const page = req.query.page;

    const cacheKey = `${query}_${page}`;

    // If cache exists and is not expired, return cached response
    if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp) < cacheExpiration) {
      res.json(cache[cacheKey].data);
      return;
    }

    const response = await axios.get(PIXABAY_API_BASE_URL, {
      params: {
        key: PIXABAY_API_KEY,
        q: query,
        image_type: "photo",
        per_page: 30,
        page: req.query.page,
      },
    });

    // Store response in cache with a timestamp
    cache[cacheKey] = {
      data: response.data,
      timestamp: Date.now(),
    };

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});


app.get('/api/image', async (req, res) => {
  try {
    const image_id = req.query.id;

    const cacheKey = `image_${image_id}`;

    // If cache exists and is not expired, return cached response
    if (cache[cacheKey] && (Date.now() - cache[cacheKey].timestamp) < cacheExpiration) {
      res.json(cache[cacheKey].data);
      return;
    }

    const response = await axios.get(PIXABAY_API_BASE_URL, {
      params: {
        key: PIXABAY_API_KEY,
        id: image_id,
      },
    });

    // Store response in cache with a timestamp
    cache[cacheKey] = {
      data: response.data,
      timestamp: Date.now(),
    };

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
