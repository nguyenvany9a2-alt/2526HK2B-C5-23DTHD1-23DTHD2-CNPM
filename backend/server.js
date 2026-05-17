const express = require("express");
const app = express();

// 👉 cho phép đọc JSON (rất quan trọng)
app.use(express.json());

/* =========================
   IMPORT ROUTES
========================= */

// API thuốc
const drugRoutes = require("./routes/drug");

/* =========================
   USE ROUTES
========================= */

// route thuốc
app.use("/api/drugs", drugRoutes);

/* =========================
   TEST SERVER
========================= */

// test trang chủ
app.get("/", (req, res) => {
    res.send("Backend running OK 🚀");
});

/* =========================
   RUN SERVER
========================= */

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});