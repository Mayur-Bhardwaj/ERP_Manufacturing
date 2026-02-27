import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login"; 

function App() {
  return (
      <Routes>
       <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<login />} />
      </Routes>
  );
}

export default App;

// Coomand --> npm run dev