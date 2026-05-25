const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ==========================================
// KẾT NỐI DATABASE MYSQL (Theo ảnh Database.png)
// ==========================================
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Để trống nếu dùng XAMPP mặc định
    database: 'snake_cnpm',
    port: 3307 // Sửa thành 3306 nếu XAMPP của bạn chạy cổng mặc định
});

db.connect((err) => {
    if (err) {
        console.error('❌ Lỗi kết nối MySQL:', err.message);
        return;
    }
    console.log('🚀 Đã kết nối cơ sở dữ liệu MySQL thành công!');
});

// Trang chủ kiểm tra hệ thống
app.get('/', (req, res) => {
    res.json({ message: "Backend Node.js đang chạy mượt mà!" });
});

// ==========================================
// 1. LẤY DANH SÁCH THUỐC (Medicines)
// ==========================================
app.get('/medicines', (req, res) => {
    const sql = "SELECT * FROM medicines";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ==========================================
// 2. LẤY DANH SÁCH BỆNH NỀN (Diseases)
// ==========================================
app.get('/diseases', (req, res) => {
    const sql = "SELECT * FROM diseases";
    db.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// ==========================================
// 3. KIỂM TRA CHỐNG CHỈ ĐỊNH (Thuốc ↔ Bệnh nền)
// ==========================================
app.post('/check', (req, res) => {
    const { medicine_id, disease_id } = req.body;

    const query = `
        SELECT m.medicine_name, d.disease_name, c.warning_level, c.note 
        FROM contraindications c
        JOIN medicines m ON c.medicine_id = m.medicine_id
        JOIN diseases d ON c.disease_id = d.disease_id
        WHERE c.medicine_id = ? AND c.disease_id = ?
    `;

    db.query(query, [medicine_id, disease_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            return res.json({
                status: "warning",
                medicine: results[0].medicine_name,
                disease: results[0].disease_name,
                warning_level: results[0].warning_level,
                medical_notes: results[0].note
            });
        }

        res.json({
            status: "safe",
            message: "Không có chống chỉ định"
        });
    });
});

// Cấu hình cổng chạy Server Backend
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});