import Lab1 from "./Labs/Lab1";
import Lab2 from "./Labs/Lab2";
import Lab3 from "./Labs/Lab3";
import Kambaz from "./Kambaz";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";

export default function App() {
  return (
    <HashRouter>
      <div>
        <Routes>
          {/* Main Redirect */}
          <Route path="/" element={<Navigate to="/Kambaz" />} />

          {/* Kambaz Application */}
          <Route path="/Kambaz/*" element={<Kambaz />} />

          {/* Redirect /Labs to /labs/lab1 */}
          <Route path="/Labs" element={<Navigate to="/labs/lab1" />} />

          {/* Individual Labs */}
          <Route path="/labs/lab1" element={<Lab1 />} />
          <Route path="/labs/lab2" element={<Lab2 />} />
          <Route path="/labs/lab3" element={<Lab3 />} />
        </Routes>
      </div>
    </HashRouter>
  );
}




