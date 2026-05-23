import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import InputDrugPage from "./pages/InputDrugPage";
import InputDiseasePage from "./pages/InputDiseasePage";
import ResultPage from "./pages/ResultPage";
import WarningPage from "./pages/WarningPage";
import DrugInteractionPage from "./pages/DrugInteractionPage";
import HistoryPage from "./pages/HistoryPage";

function App() {
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