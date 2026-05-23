const express = require("express");
const router = express.Router();

// DATA GIẢ (chưa cần database)
let drugs = [
    { id: 1, name: "Paracetamol", category: "giảm đau" },
    { id: 2, name: "Ibuprofen", category: "kháng viêm" }
];


// 📌 GET ALL
router.get("/", (req, res) => {
    res.json(drugs);
});


// 📌 GET BY ID
router.get("/:id", (req, res) => {
    const drug = drugs.find(d => d.id == req.params.id);
    res.json(drug);
});


// 📌 CREATE
router.post("/", (req, res) => {
    const newDrug = {
        id: drugs.length + 1,
        ...req.body
    };

    drugs.push(newDrug);

    res.json(newDrug);
});


// 📌 UPDATE
router.put("/:id", (req, res) => {
    const index = drugs.findIndex(d => d.id == req.params.id);

    drugs[index] = {
        ...drugs[index],
        ...req.body
    };

    res.json(drugs[index]);
});


// 📌 DELETE
router.delete("/:id", (req, res) => {
    drugs = drugs.filter(d => d.id != req.params.id);

    res.json({ message: "Deleted success" });
});


// export
module.exports = router;