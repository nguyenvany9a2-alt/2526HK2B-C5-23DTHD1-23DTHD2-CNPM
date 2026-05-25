import { useNavigate } from "react-router-dom";

export default function HistoryPage() {
  const navigate = useNavigate();

  // Mảng dữ liệu tĩnh để demo tạm thời (Chúng ta sẽ làm API lưu thật ở bước sau)
  const mockHistory = [
    { id: 1, date: "25/05/2026 14:22", type: "Thuốc ↔ Bệnh", item1: "Aspirin", item2: "Viêm loét dạ dày", status: "Danger", note: "Tăng nguy cơ xuất huyết tiêu hóa" },
    { id: 2, date: "25/05/2026 15:05", type: "Tương tác Thuốc", item1: "Paracetamol", item2: "Amoxicillin", status: "Safe", note: "Không phát hiện phản ứng phụ chéo" }
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f7fafc", minHeight: "100vh" }}>
      <nav style={{ backgroundColor: "#2b6cb0", padding: "15px 30px", display: "flex", justifyContent: "space-between", color: "white" }}>
        <div style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/")}>🩺 MedWarning System</div>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "white", cursor: "pointer" }}>Trở về</button>
      </nav>

      <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" }}>
          <h2 style={{ color: "#2d3748", marginBottom: "25px", borderBottom: "2px solid #e2e8f0", paddingBottom: "15px" }}>⏳ Nhật Ký Lịch Sử Tra Cứu Hệ Thống</h2>
          
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ backgroundColor: "#f7fafc", borderBottom: "2px solid #e2e8f0" }}>
                <th style={{ padding: "12px", color: "#718096" }}>Thời gian</th>
                <th style={{ padding: "12px", color: "#718096" }}>Nghiệp vụ</th>
                <th style={{ padding: "12px", color: "#718096" }}>Đối tượng kiểm tra</th>
                <th style={{ padding: "12px", color: "#718096" }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {mockHistory.map((h) => (
                <tr key={h.id} style={{ borderBottom: "1px solid #edf2f7" }}>
                  <td style={{ padding: "15px 12px", fontSize: "14px", color: "#4a5568" }}>{h.date}</td>
                  <td style={{ padding: "15px 12px" }}><span style={{ backgroundColor: "#ebf8ff", color: "#2b6cb0", padding: "3px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>{h.type}</span></td>
                  <td style={{ padding: "15px 12px", fontSize: "15px" }}><strong>{h.item1}</strong> với <i>{h.item2}</i></td>
                  <td style={{ padding: "15px 12px" }}>
                    <span style={{ backgroundColor: h.status === "Danger" ? "#fff5f5" : "#f0fff4", color: h.status === "Danger" ? "#e53e3e" : "#38a169", padding: "4px 10px", borderRadius: "12px", fontSize: "13px", fontWeight: "bold" }}>
                      {h.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}