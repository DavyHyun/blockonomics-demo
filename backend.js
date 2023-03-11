// Your Blockonomics API key
const API_KEY = 'GvKhuT7cC14bqk0NX7FGlMJeytOnHyhXsmsyhJc4Bzc';

const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(express.json());

//axios '/orders' endpoint that uses the merchant_orders endpoint to retrieve list of orders made to the payment button
app.get('/orders', (req, res) => {

  //API Key is the authorization header of the request
  const config = {
    headers: { Authorization: `Bearer ${API_KEY}` }
  };

  // merchant_orders endpoint, returns list of all payment button orders in descending order of time
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