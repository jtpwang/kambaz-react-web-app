import Labs from "./Labs";
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

          {/* Redirect /Labs*/}
          <Route path="/Labs/*" element={<Labs />} />
        </Routes>
      </div>
    </HashRouter>
  );
}