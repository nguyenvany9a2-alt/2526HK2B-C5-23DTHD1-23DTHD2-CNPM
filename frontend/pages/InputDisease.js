import React, { useState } from "react";

export default function InputDisease() {
  const [disease, setDisease] = useState("");

  return (
    <div>
      <h2>Nhập bệnh nền</h2>
      <input
        value={disease}
        onChange={(e) => setDisease(e.target.value)}
        placeholder="Nhập bệnh nền"
      />
    </div>
  );
}