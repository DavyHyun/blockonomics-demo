

// Set your Blockonomics API key
const API_KEY = 'GvKhuT7cC14bqk0NX7FGlMJeytOnHyhXsmsyhJc4Bzc';

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/orders', (req, res) => {
  const config = {
    headers: { Authorization: `Bearer ${API_KEY}` }
  };

  axios.get('https://www.blockonomics.co/api/merchant_orders', config)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving orders' });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});