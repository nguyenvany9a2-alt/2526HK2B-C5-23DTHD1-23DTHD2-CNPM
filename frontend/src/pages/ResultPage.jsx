import { useNavigate } from "react-router-dom";

export default function ResultPage() {
  const navigate = useNavigate();
  const result = JSON.parse(localStorage.getItem("check_result"));

  if (!result) {
    return <div style={{ padding: "30px", textAlign: "center" }}>Chưa có dữ liệu kết quả...</div>;
  }

  const isWarning = result.status === "warning";
  const isDanger = result.warning_level === "Danger";

  // Đổi màu thông minh
  const cardBg = !isWarning ? "#f0fff4" : isDanger ? "#fff5f5" : "#fffaf0";
  const borderCol = !isWarning ? "#38a169" : isDanger ? "#e53e3e" : "#dd6b20";
  const textCol = !isWarning ? "#22543d" : isDanger ? "#742a2a" : "#744210";

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f7fafc", minHeight: "100vh" }}>
      <nav style={{ backgroundColor: "#2b6cb0", padding: "15px 30px", display: "flex", justifyContent: "space-between", color: "white" }}>
        <div style={{ fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/")}>Code Result</div>
      </nav>

      <div style={{ padding: "5px 20px", maxWidth: "650px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", padding: "35px", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)", marginTop: "40px" }}>
          <h2 style={{ textAlign: "center", color: "#2d3748", marginBottom: "30px" }}>🔬 Kết Quả Đánh Giá Lâm Sàng</h2>
          
          <div style={{ backgroundColor: cardBg, borderLeft: `6px solid ${borderCol}`, padding: "20px", borderRadius: "8px", color: textCol }}>
            <span style={{ backgroundColor: borderCol, color: "white", padding: "4px 10px", borderRadius: "20px", fontSize: "11px", fontWeight: "bold", display: "inline-block", marginBottom: "15px" }}>
              {(!isWarning) ? "SAFE" : result.warning_level.toUpperCase()}
            </span>

            {isWarning ? (
              <div>
                <h3 style={{ margin: "0 0 15px 0", fontSize: "22px" }}>⚠️ Phát Hiện Chống Chỉ Định!</h3>
                <p style={{ margin: "6px 0" }}><strong>Thuốc:</strong> {result.medicine}</p>
                <p style={{ margin: "6px 0" }}><strong>Yếu tố bệnh lý:</strong> {result.disease}</p>
                <p style={{ margin: "6px 0" }}><strong>Mức độ cảnh báo:</strong> <span style={{ fontWeight: "bold", textDecoration: "underline" }}>{result.warning_level}</span></p>
                <div style={{ marginTop: "15px", backgroundColor: "rgba(255,255,255,0.7)", padding: "15px", borderRadius: "6px", border: "1px dashed #cbd5e0" }}>
                  <strong>Ghi chú Y lệnh:</strong> <p style={{ margin: "5px 0 0 0", fontStyle: "italic" }}>{result.medical_notes || "Chưa có ghi chú lâm sàng."}</p>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "10px 0" }}>
                <h3 style={{ margin: "0 0 10px 0", fontSize: "22px" }}>🎉 Hoàn Toàn An Toàn!</h3>
                <p style={{ fontSize: "16px", margin: 0 }}>{result.message}</p>
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "15px", marginTop: "35px" }}>
            <button onClick={() => navigate("/input-drug")} style={{ flex: 1, padding: "12px", backgroundColor: "#4a5568", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>Thử lại lượt mới</button>
            <button onClick={() => navigate("/")} style={{ flex: 1, padding: "12px", backgroundColor: "#2b6cb0", color: "white", border: "none", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>Trở về trang chủ</button>
          </div>
        </div>
      </div>
    </div>
  );
}