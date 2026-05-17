const express = require("express");
const router = express.Router();

// dữ liệu giả
let diseases = [
    { id: 1, name: "Tiểu đường", description: "Bệnh rối loạn đường huyết" },
    { id: 2, name: "Huyết áp cao", description: "Tăng huyết áp mãn tính" },
    { id: 3, name: "Suy gan", description: "Chức năng gan suy giảm" }
];

// 📌 GET ALL
router.get("/", (req, res) => {
    res.json(diseases);
});

// 📌 GET BY ID
router.get("/:id", (req, res) => {
    const disease = diseases.find(d => d.id == req.params.id);
    res.json(disease);
});

// 📌 CREATE
router.post("/", (req, res) => {
    const newDisease = {
        id: diseases.length + 1,
        ...req.body
    };

    diseases.push(newDisease);

    res.json(newDisease);
});

// 📌 UPDATE
router.put("/:id", (req, res) => {
    const index = diseases.findIndex(d => d.id == req.params.id);

    diseases[index] = {
        ...diseases[index],
        ...req.body
    };

    res.json(diseases[index]);
});

// 📌 DELETE
router.delete("/:id", (req, res) => {
    diseases = diseases.filter(d => d.id != req.params.id);
    res.json({ message: "Deleted disease success" });
});

module.exports = router;