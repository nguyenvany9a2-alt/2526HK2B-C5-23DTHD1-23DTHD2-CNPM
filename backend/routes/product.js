const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    res.json([
        { id: 1, name: "Laptop Dell", price: 1500 },
        { id: 2, name: "Macbook", price: 2000 }
    ]);
});

module.exports = router;
