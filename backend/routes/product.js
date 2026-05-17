const express = require('express');
const router = express.Router();

router.get('/products', (req, res) => {
    res.json([
        { id: 1, name: "Laptop A", price: 1000 },
        { id: 2, name: "Laptop B", price: 1500 }
    ]);
});

module.exports = router;