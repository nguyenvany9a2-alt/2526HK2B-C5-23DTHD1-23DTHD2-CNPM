CREATE DATABASE snake_cnpm;
USE snake_cnpm;

-- =========================
-- TABLE USERS
-- =========================
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    full_name VARCHAR(100),
    role VARCHAR(20) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLE MEDICINES
-- =========================
CREATE TABLE medicines (
    medicine_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand_name VARCHAR(100),
    active_ingredient VARCHAR(255),
    dosage_form VARCHAR(50),
    strength VARCHAR(50),
    description TEXT
);

-- =========================
-- TABLE DISEASES
-- =========================
CREATE TABLE diseases (
    disease_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icd_10_code VARCHAR(10) UNIQUE,
    description TEXT
);

-- =========================
-- TABLE CONTRAINDICATIONS
-- =========================
CREATE TABLE contraindications (
    contraindication_id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_id INT NOT NULL,
    disease_id INT NOT NULL,
    warning_level VARCHAR(20) NOT NULL,
    medical_notes TEXT,

    FOREIGN KEY (medicine_id)
        REFERENCES medicines(medicine_id)
        ON DELETE CASCADE,

    FOREIGN KEY (disease_id)
        REFERENCES diseases(disease_id)
        ON DELETE CASCADE
);

-- =========================
-- TABLE DRUG INTERACTIONS
-- =========================
CREATE TABLE druginteractions (
    interaction_id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_id_1 INT NOT NULL,
    medicine_id_2 INT NOT NULL,
    severity VARCHAR(20) NOT NULL,
    description TEXT,

    FOREIGN KEY (medicine_id_1)
        REFERENCES medicines(medicine_id),

    FOREIGN KEY (medicine_id_2)
        REFERENCES medicines(medicine_id)
);

-- =========================
-- TABLE CHECK HISTORY
-- =========================
CREATE TABLE checkhistory (
    check_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    check_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    result_summary TEXT,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);

-- =========================
-- INSERT USERS
-- =========================
INSERT INTO users (username, password, email, full_name, role)
VALUES
('admin', '123456', 'admin@gmail.com', 'Quản trị viên', 'Admin'),
('doctor01', '123456', 'doctor@gmail.com', 'Bác sĩ Nguyễn Văn A', 'Doctor'),
('patient01', '123456', 'patient@gmail.com', 'Trần Thị B', 'Patient');

-- =========================
-- INSERT MEDICINES
-- =========================
INSERT INTO medicines (name, brand_name, active_ingredient, dosage_form, strength, description)
VALUES
('Paracetamol', 'Panadol', 'Paracetamol', 'Tablet', '500mg', 'Thuốc giảm đau hạ sốt'),
('Aspirin', 'Bayer Aspirin', 'Acetylsalicylic Acid', 'Tablet', '500mg', 'Thuốc chống viêm giảm đau'),
('Ibuprofen', 'Brufen', 'Ibuprofen', 'Capsule', '400mg', 'Thuốc giảm đau NSAIDs'),
('Amoxicillin', 'Amoxil', 'Amoxicillin', 'Capsule', '500mg', 'Kháng sinh penicillin'),
('Diclofenac', 'Voltaren', 'Diclofenac Sodium', 'Tablet', '50mg', 'Thuốc chống viêm');

-- =========================
-- INSERT DISEASES
-- =========================
INSERT INTO diseases (name, icd_10_code, description)
VALUES
('Viêm loét dạ dày', 'K25', 'Tổn thương niêm mạc dạ dày'),
('Suy gan', 'K72', 'Chức năng gan suy giảm'),
('Suy thận', 'N17', 'Chức năng thận suy giảm'),
('Hen suyễn', 'J45', 'Bệnh đường hô hấp mãn tính'),
('Tăng huyết áp', 'I10', 'Huyết áp cao');

-- =========================
-- INSERT CONTRAINDICATIONS
-- =========================
INSERT INTO contraindications (medicine_id, disease_id, warning_level, medical_notes)
VALUES
(2, 1, 'Danger', 'Aspirin có thể gây xuất huyết dạ dày'),
(3, 3, 'Danger', 'Ibuprofen có thể làm nặng suy thận'),
(1, 2, 'Caution', 'Paracetamol liều cao gây hại gan'),
(5, 1, 'Danger', 'Diclofenac gây kích ứng dạ dày'),
(2, 5, 'Caution', 'Aspirin có thể ảnh hưởng huyết áp');

-- =========================
-- INSERT DRUG INTERACTIONS
-- =========================
INSERT INTO druginteractions (medicine_id_1, medicine_id_2, severity, description)
VALUES
(2, 3, 'Danger', 'Aspirin và Ibuprofen tăng nguy cơ xuất huyết'),
(1, 5, 'Caution', 'Paracetamol và Diclofenac cần theo dõi gan'),
(3, 5, 'Danger', 'Ibuprofen và Diclofenac tăng nguy cơ loét dạ dày'),
(2, 5, 'Danger', 'Kết hợp Aspirin và Diclofenac dễ gây xuất huyết');

-- =========================
-- INSERT CHECK HISTORY
-- =========================
INSERT INTO checkhistory (user_id, result_summary)
VALUES
(3, 'Kiểm tra Paracetamol với Suy gan'),
(3, 'Kiểm tra Aspirin với Viêm loét dạ dày'),
(2, 'Kiểm tra tương tác Aspirin và Ibuprofen');