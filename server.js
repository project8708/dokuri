
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

let orders = {};

app.post('/api/orders', (req, res) => {
    const { table, items, total, timestamp } = req.body;
    if (!orders[table]) {
        orders[table] = [];
    }
    orders[table].push({ items, total, timestamp });
    res.status(200).send('Order received');
});

app.get('/api/orders', (req, res) => {
    res.status(200).json(orders);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
