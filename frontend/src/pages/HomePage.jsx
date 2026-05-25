import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/medicines")
      .then((res) => res.json())
      .then((data) => setMedicines(data))
      .catch((err) => console.log("Lỗi API:", err));
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, sans-serif", backgroundColor: "#f7fafc", minHeight: "100vh" }}>
      {/* NAVBAR CHUNG */}
      <nav style={{ backgroundColor: "#2b6cb0", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <div style={{ color: "white", fontSize: "20px", fontWeight: "bold", display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/")}>
          🩺 MedWarning System
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          <button onClick={() => navigate("/input-drug")} style={{ background: "none", border: "none", color: "white", fontWeight: "500", cursor: "pointer", fontSize: "15px" }}>Thuốc ↔ Bệnh</button>
          <button onClick={() => navigate("/interaction")} style={{ background: "none", border: "none", color: "white", fontWeight: "500", cursor: "pointer", fontSize: "15px" }}>Tương tác Thuốc</button>
          <button onClick={() => navigate("/history")} style={{ background: "none", border: "none", color: "white", fontWeight: "500", cursor: "pointer", fontSize: "15px" }}>Lịch sử</button>
        </div>
      </nav>

      {/* BODY CONTENT */}
      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "40px", backgroundColor: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h1 style={{ color: "#2d3748", fontSize: "32px", marginBottom: "10px" }}>💊 Hệ Thống Cảnh Báo Chống Chỉ Định & Tương Tác Thuốc</h1>
          <p style={{ color: "#718096", fontSize: "16px" }}>Giải pháp công nghệ hỗ trợ tra cứu an toàn dược phẩm và quản lý bệnh lý nền lý tưởng cho y bác sĩ.</p>
        </div>

        <h2 style={{ color: "#2d3748", marginBottom: "20px", borderLeft: "5px solid #2b6cb0", paddingLeft: "10px" }}>📋 Danh Mục Thuốc Hệ Thống ({medicines.length})</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "25px" }}>
          {medicines.map((medicine) => (
            <div key={medicine.medicine_id} style={{ backgroundColor: "white", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", boxShadow: "0 4px 6px rgba(0,0,0,0.02)", transition: "all 0.2s" }}>
              <h3 style={{ color: "#2b6cb0", margin: "0 0 10px 0", fontSize: "18px" }}>{medicine.name}</h3>
              <div style={{ fontSize: "14px", color: "#4a5568", display: "flex", flexDirection: "column", gap: "6px" }}>
                <p style={{ margin: 0 }}><strong>Hãng:</strong> {medicine.brand_name || "N/A"}</p>
                <p style={{ margin: 0 }}><strong>Hoạt chất:</strong> {medicine.active_ingredient}</p>
                <p style={{ margin: 0 }}><strong>Dạng bào chế:</strong> {medicine.dosage_form}</p>
                <p style={{ margin: 0 }}><strong>Hàm lượng:</strong> <span style={{ backgroundColor: "#e2e8f0", padding: "2px 6px", borderRadius: "4px", fontSize: "12px" }}>{medicine.strength}</span></p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}