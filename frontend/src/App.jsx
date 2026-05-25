import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./pages/HomePage";
import InputDrugPage from "./pages/InputDrugPage";
import InputDiseasePage from "./pages/InputDiseasePage";
import ResultPage from "./pages/ResultPage";
import WarningPage from "./pages/WarningPage";
import DrugInteractionPage from "./pages/DrugInteractionPage";
import HistoryPage from "./pages/HistoryPage";

function App() {

  useEffect(() => {
    fetch("http://127.0.0.1:5000/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend response:", data);
      })
      .catch((err) => {
        console.log("Lỗi kết nối backend:", err);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/input-drug" element={<InputDrugPage />} />
        <Route path="/input-disease" element={<InputDiseasePage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/warning" element={<WarningPage />} />
        <Route path="/interaction" element={<DrugInteractionPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;