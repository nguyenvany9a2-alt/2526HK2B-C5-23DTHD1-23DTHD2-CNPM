import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InputDiseasePage() {
  const [diseases, setDiseases] = useState([]);
  const [selectedDisease, setSelectedDisease] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/diseases")
      .then(res => res.json())
      .then(data => setDiseases(data));
  }, []);

  const handleCheck = async () => {
    if(!selectedDisease) return alert("Vui lòng chọn bệnh nền lý tương ứng!");
    const medicine_id = localStorage.getItem("medicine_id");
    
    const response = await fetch("http://127.0.0.1:5000/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicine_id, disease_id: selectedDisease })
    });

    const result = await response.json();
    localStorage.setItem("check_result", JSON.stringify(result));
    navigate("/result");
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f7fafc", minHeight: "100vh" }}>
      <nav style={{ backgroundColor: "#2b6cb0", padding: "15px 30px", display: "flex", justifyContent: "space-between", color: "white" }}>
        <div style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/")}>🩺 MedWarning System</div>
        <button onClick={() => navigate("/input-drug")} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>◀ Chọn lại thuốc</button>
      </nav>

      <div style={{ padding: "60px 20px", maxWidth: "500px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", padding: "40px", borderRadius: "12px", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", textAlign: "center" }}>
          <div style={{ fontSize: "50px", marginBottom: "10px" }}>Sub-Step 2</div>
          <h2 style={{ color: "#2d3748", marginBottom: "8px" }}>🩺 Khai Báo Bệnh Nền</h2>
          <p style={{ color: "#718096", fontSize: "14px", marginBottom: "30px" }}>Hệ thống sẽ đối chiếu thuốc đã chọn với bệnh lý nền này.</p>
          
          <select
            value={selectedDisease}
            onChange={(e) => setSelectedDisease(e.target.value)}
            style={{ padding: "12px", width: "100%", borderRadius: "8px", border: "2px solid #e2e8f0", fontSize: "16px", outline: "none", color: "#4a5568", marginBottom: "25px", backgroundColor: "#f7fafc" }}
          >
            <option value="">-- Click để chọn bệnh lý nền --</option>
            {diseases.map((disease) => (
              <option key={disease.disease_id} value={disease.disease_id}>{disease.name}</option>
            ))}
          </select>

          <button
            onClick={handleCheck}
            style={{ width: "100%", padding: "14px", backgroundColor: "#319795", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 6px rgba(49,151,149,0.2)" }}
          >
            ⚡ Kiểm Tra Chống Chỉ Định
          </button>
        </div>
      </div>
    </div>
  );
}