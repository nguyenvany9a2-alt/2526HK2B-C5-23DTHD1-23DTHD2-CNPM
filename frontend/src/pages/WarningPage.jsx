import { useNavigate } from "react-router-dom";

export default function WarningPage() {
  const navigate = useNavigate();

  // Dữ liệu mẫu danh mục các cảnh báo nghiêm trọng hệ thống quản lý để demo
  const criticalWarnings = [
    { id: 1, drug: "Aspirin", type: "Chống chỉ định (Thuốc ↔ Bệnh)", target: "Viêm loét dạ dày", level: "Danger", effect: "Tăng xuất huyết tiêu hóa nặng" },
    { id: 2, drug: "Warfarin + Aspirin", type: "Tương tác mạnh (Thuốc ↔ Thuốc)", target: "Phối hợp chéo", level: "Danger", effect: "Chảy máu nội tạng không kiểm soát" },
    { id: 3, drug: "Paracetamol", type: "Chống chỉ định (Thuốc ↔ Bệnh)", target: "Suy gan cấp tính", level: "Danger", effect: "Gây hoại tử tế bào gan, suy gan nghiêm trọng" },
    { id: 4, drug: "Ibuprofen", type: "Thận trọng sử dụng (Thuốc ↔ Bệnh)", target: "Suy thận mãn tính", level: "Caution", effect: "Giảm dòng máu qua thận, suy giảm chức năng thận" },
    { id: 5, drug: "Metformin", type: "Chống chỉ định (Thuốc ↔ Bệnh)", target: "Suy tim nặng", level: "Danger", effect: "Tăng nguy cơ nhiễm toan lactic đe dọa tính mạng" }
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', Roboto, sans-serif", backgroundColor: "#f7fafc", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <nav style={{ backgroundColor: "#2b6cb0", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}>
        <div style={{ color: "white", fontSize: "20px", fontWeight: "bold", cursor: "pointer" }} onClick={() => navigate("/")}>
          Simple MedWarning
        </div>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "white", fontWeight: "500", cursor: "pointer", fontSize: "15px" }}>
          ◀ Trở về Trang chủ
        </button>
      </nav>

      {/* MAIN CONTAINER */}
      <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", marginBottom: "30px" }}>
          <h1 style={{ color: "#e53e3e", margin: "0 0 10px 0", display: "flex", alignItems: "center", gap: "10px" }}>
            ⚠️ Danh Mục Cảnh Báo Lâm Sàng Đặc Biệt Nguy Hiểm
          </h1>
          <p style={{ color: "#718096", margin: 0, fontSize: "15px" }}>
            Tổng hợp các cặp tương tác chéo thuốc-thuốc và thuốc-bệnh nền có mức độ rủi ro cao nhất được thiết lập sẵn trong hệ thống cơ sở dữ liệu `snake_cnpm`.
          </p>
        </div>

        {/* LIST OF WARNING CARDS */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {criticalWarnings.map((w) => {
            const isDanger = w.level === "Danger";
            return (
              <div
                key={w.id}
                style={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "10px",
                  padding: "20px",
                  borderLeft: `6px solid ${isDanger ? "#e53e3e" : "#dd6b20"}`,
                  boxShadow: "0 2px 4px rgba(0,0,0,0.02)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <h3 style={{ margin: 0, color: "#2d3748", fontSize: "18px" }}>{w.drug}</h3>
                    <span style={{ backgroundColor: "#edf2f7", color: "#4a5568", padding: "2px 8px", borderRadius: "4px", fontSize: "12px", fontWeight: "500" }}>
                      {w.type}
                    </span>
                  </div>
                  <p style={{ margin: "5px 0", color: "#4a5568", fontSize: "15px" }}>
                    <strong>Yếu tố tương tác:</strong> <span style={{ color: "#2d3748" }}>{w.target}</span>
                  </p>
                  <p style={{ margin: "5px 0", color: isDanger ? "#9b2c2c" : "#744210", fontSize: "14px", fontStyle: "italic" }}>
                    <strong>Hậu quả lâm sàng:</strong> {w.effect}
                  </p>
                </div>

                <div>
                  <span
                    style={{
                      backgroundColor: isDanger ? "#fff5f5" : "#fffaf0",
                      color: isDanger ? "#e53e3e" : "#dd6b20",
                      border: `1px solid ${isDanger ? "#feb2b2" : "#fbd38d"}`,
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "bold",
                      textTransform: "uppercase"
                    }}
                  >
                    {isDanger ? "Nguy Hiểm 🚨" : "Thận Trọng ⚠️"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}