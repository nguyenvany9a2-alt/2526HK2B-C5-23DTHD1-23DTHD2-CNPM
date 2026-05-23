const express = require("express");
const app = express();

app.use(express.json());

// routes thuốc
const drugRoutes = require("./routes/drug");
app.use("/api/drugs", drugRoutes);

// routes bệnh nền
const diseaseRoutes = require("./routes/disease");
app.use("/api/diseases", diseaseRoutes);

app.get("/", (req, res) => {
    res.send("Backend running OK 🚀");
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});