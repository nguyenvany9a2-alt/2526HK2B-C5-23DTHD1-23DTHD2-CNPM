import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DrugInteractionPage() {
  const [medicines, setMedicines] = useState([]);
  const [medicine1, setMedicine1] = useState("");
  const [medicine2, setMedicine2] = useState("");
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/medicines")
      .then(res => res.json())
      .then(data => setMedicines(data));
  }, []);

  const handleCheck = async () => {
    if(!medicine1 || !medicine2) return alert("Vui lòng chọn đủ cả 2 loại thuốc cần so sánh!");
    if(medicine1 === medicine2) return alert("Không thể kiểm tra tương tác của cùng một loại thuốc!");

    const response = await fetch("http://127.0.0.1:5000/check-interaction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ medicine_id_1: medicine1, medicine_id_2: medicine2 })
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f7fafc", minHeight: "100vh" }}>
      <nav style={{ backgroundColor: "#2b6cb0", padding: "15px 30px", display: "flex", justifyContent: "space-between", color: "white" }}>
        <div style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/")}>🩺 MedWarning System</div>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>Trang chủ</button>
      </nav>

      <div style={{ padding: "40px 20px", maxWidth: "700px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", padding: "35px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)" }}>
          <h2 style={{ textAlign: "center", color: "#2d3748", marginBottom: "30px" }}>🔗 Kiểm Tra Tương Tác Giữa Các Loại Thuốc</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "25px" }}>
            <div>
              <label style={{ display: "block", color: "#4a5568", fontWeight: "bold", marginBottom: "6px", fontSize: "14px" }}>Dược Phẩm 1</label>
              <select value={medicine1} onChange={(e) => setMedicine1(e.target.value)} style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #cbd5e0", backgroundColor: "#f7fafc" }}>
                <option value="">-- Chọn thuốc 1 --</option>
                {medicines.map(m => <option key={m.medicine_id} value={m.medicine_id}>{m.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: "block", color: "#4a5568", fontWeight: "bold", marginBottom: "6px", fontSize: "14px" }}>Dược Phẩm 2</label>
              <select value={medicine2} onChange={(e) => setMedicine2(e.target.value)} style={{ padding: "10px", width: "100%", borderRadius: "6px", border: "1px solid #cbd5e0", backgroundColor: "#f7fafc" }}>
                <option value="">-- Chọn thuốc 2 --</option>
                {medicines.map(m => <option key={m.medicine_id} value={m.medicine_id}>{m.name}</option>)}
              </select>
            </div>
          </div>

          <button onClick={handleCheck} style={{ width: "100%", padding: "14px", backgroundColor: "#2b6cb0", color: "white", border: "none", borderRadius: "8px", fontSize: "16px", fontWeight: "bold", cursor: "pointer" }}>
            🔍 Phân Tích Tương Tác Thuốc Chéo
          </button>

          {result && (
            <div style={{ marginTop: "30px", padding: "20px", borderRadius: "8px", backgroundColor: result.status === "warning" ? (result.severity === "Danger" ? "#fff5f5" : "#fffaf0") : "#f0fff4", borderLeft: `6px solid ${result.status === "warning" ? (result.severity === "Danger" ? "#e53e3e" : "#dd6b20") : "#38a169"}` }}>
              {result.status === "warning" ? (
                <div style={{ color: result.severity === "Danger" ? "#742a2a" : "#744210" }}>
                  <h3 style={{ margin: "0 0 10px 0" }}>⚠️ Cảnh Báo Lâm Sàng Nguy Hiểm!</h3>
                  <p><strong>Cặp Thuốc:</strong> {result.medicine_1} <b>+</b> {result.medicine_2}</p>
                  <p><strong>Mức độ độc hại:</strong> {result.severity}</p>
                  <p><strong>Cơ chế phản ứng độc hại:</strong> {result.description}</p>
                </div>
              ) : (
                <div style={{ color: "#22543d", textAlign: "center" }}>
                  <h3 style={{ margin: "0 0 5px 0" }}>✅ Cặp Thuốc An Toàn</h3>
                  <p style={{ margin: 0 }}>{result.message}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}