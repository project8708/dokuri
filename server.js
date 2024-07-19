
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.post('/order', (req, res) => {
    const order = req.body;
    console.log('Order received:', order);
    // 여기서 주문 데이터를 데이터베이스에 저장하거나 다른 처리를 수행할 수 있습니다.
    res.status(200).send('Order received');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
