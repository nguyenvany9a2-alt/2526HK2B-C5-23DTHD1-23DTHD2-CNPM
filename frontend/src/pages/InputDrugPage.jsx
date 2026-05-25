import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InputDrugPage() {
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/medicines")
      .then(res => res.json())
      .then(data => setMedicines(data));
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f7fafc", minHeight: "100vh" }}>
      <nav style={{ backgroundColor: "#2b6cb0", padding: "15px 30px", display: "flex", justifyContent: "space-between", color: "white" }}>
        <div style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/")}>🩺 MedWarning System</div>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>Quay lại Trang chủ</button>
      </nav>

      <div style={{ padding: "60px 20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>Sub-Step 1</div>
          <h2 style={{ color: "#2d3748", marginBottom: "8px" }}>💊 Khởi Tạo Tra Cứu</h2>
          <p style={{ color: "#718096", fontSize: "14px", marginBottom: "30px" }}>Vui lòng chọn loại thuốc bạn dự định chỉ định hoặc sử dụng.</p>
          
          <select
            value={selectedMedicine}
            onChange={(e) => setSelectedMedicine(e.target.value)}
            style={{ padding: "12px", width: "100%", borderRadius: "8px", border: "2px solid #e2e8f0", fontSize: "16px", outline: "none", color: "#4a5568", marginBottom: "25px", backgroundColor: "#f7fafc" }}
          >
            <option value="">-- Click để chọn thuốc --</option>
            {medicines.map((medicine) => (
              <option key={medicine.medicine_id} value={medicine.medicine_id}>{medicine.name}</option>
            ))}
          </select>

          <button
            onClick={() => {
              if(!selectedMedicine) return alert("Vui lòng chọn một loại thuốc!");
              localStorage.setItem("medicine_id", selectedMedicine);
              navigate("/input-disease");
            }}
            style={{ width: "100%", padding: "14px", backgroundColor: "#2b6cb0", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 6px rgba(43,108,176,0.2)" }}
          >
            Tiếp Tục Chọn Bệnh Nền ➔
          </button>
        </div>
      </div>
    </div>
  );
}