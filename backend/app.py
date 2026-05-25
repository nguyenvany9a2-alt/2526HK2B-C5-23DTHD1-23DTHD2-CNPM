from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_mysqldb import MySQL

app = Flask(__name__)
CORS(app)

# ==========================================
# CẤU HÌNH MYSQL KHỚP VỚI XAMPP CỦA BẠN
# ==========================================
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'snake_cnpm'
app.config['MYSQL_PORT'] = 3307  # Thay thành 3306 nếu XAMPP dùng cổng mặc định

mysql = MySQL(app)

@app.route("/")
def home():
    return jsonify({"message": "Backend Flask đang chạy ổn định!"})

# API LẤY DANH SÁCH THUỐC (Khớp bảng medicines)
@app.route("/medicines")
def get_medicines():
    cur = mysql.connection.cursor()
    cur.execute("SELECT medicine_id, medicine_name, ingredient, dosage FROM medicines")
    data = cur.fetchall()
    medicines = []
    for row in data:
        medicines.append({
            "medicine_id": row[0],
            "name": row[1],
            "active_ingredient": row[2],
            "strength": row[3],
            "brand_name": "Dược phẩm VN",
            "dosage_form": "Viên nén"
        })
    cur.close()
    return jsonify(medicines)

# API LẤY DANH SÁCH BỆNH NỀN (Khớp bảng diseases)
@app.route("/diseases")
def get_diseases():
    cur = mysql.connection.cursor()
    cur.execute("SELECT disease_id, disease_name, description FROM diseases")
    data = cur.fetchall()
    diseases = []
    for row in data:
        diseases.append({
            "disease_id": row[0],
            "name": row[1],
            "description": row[2]
        })
    cur.close()
    return jsonify(diseases)

# API KIỂM TRA CHỐNG CHỈ ĐỊNH THUỐC ↔ BỆNH (Khớp bảng contraindications)
@app.route("/check", methods=["POST"])
def check_contraindication():
    data = request.get_json()
    medicine_id = data.get("medicine_id")
    disease_id = data.get("disease_id")
    
    cur = mysql.connection.cursor()
    query = """
        SELECT m.medicine_name, d.disease_name, c.warning_level, c.note
        FROM contraindications c
        JOIN medicines m ON c.medicine_id = m.medicine_id
        JOIN diseases d ON c.disease_id = d.disease_id
        WHERE c.medicine_id = %s AND c.disease_id = %s
    """
    cur.execute(query, (medicine_id, disease_id))
    result = cur.fetchone()
    cur.close()
    
    if result:
        return jsonify({
            "status": "warning",
            "medicine": result[0],
            "disease": result[1],
            "warning_level": result[2],
            "medical_notes": result[3]
        })
    return jsonify({
        "status": "safe",
        "message": "Không phát hiện chống chỉ định. Thuốc an toàn với bệnh nền này!"
    })

# API KIỂM TRA TƯƠNG TÁC THUỐC ↔ THUỐC (Khớp bảng druginteractions)
@app.route("/check-interaction", methods=["POST"])
def check_interaction():
    data = request.get_json()
    medicine_id_1 = data.get("medicine_id_1")
    medicine_id_2 = data.get("medicine_id_2")
    
    cur = mysql.connection.cursor()
    query = """
        SELECT m1.medicine_name, m2.medicine_name, di.severity, di.effect
        FROM druginteractions di
        JOIN medicines m1 ON di.medicine_1 = m1.medicine_id
        JOIN medicines m2 ON di.medicine_2 = m2.medicine_id
        WHERE (di.medicine_1 = %s AND di.medicine_2 = %s)
           OR (di.medicine_1 = %s AND di.medicine_2 = %s)
    """
    cur.execute(query, (medicine_id_1, medicine_id_2, medicine_id_2, medicine_id_1))
    result = cur.fetchone()
    cur.close()
    
    if result:
        return jsonify({
            "status": "warning",
            "medicine_1": result[0],
            "medicine_2": result[1],
            "severity": result[2],
            "description": result[3]
        })
    return jsonify({
        "status": "safe",
        "message": "Không phát hiện tương tác chéo nguy hiểm giữa 2 thuốc!"
    })

if __name__ == "__main__":
    app.run(debug=True, port=5000)