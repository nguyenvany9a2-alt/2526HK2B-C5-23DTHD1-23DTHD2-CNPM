import React, { useState } from "react";

export default function InputDrug() {
  const [drug, setDrug] = useState("");

  return (
    <div>
      <h2>Nhập thuốc</h2>
      <input
        value={drug}
        onChange={(e) => setDrug(e.target.value)}
        placeholder="Nhập tên thuốc"
      />
    </div>
  );
}