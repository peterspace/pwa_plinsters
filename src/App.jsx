import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <div className="w-full h-screen bg-figma-400">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:event" element={<Home />} />

          <Route path="/:event/:external_id" element={<Home />} />
          <Route path="/:event/:fbclid/:external_id" element={<Home />} />
          <Route
            path="/:event/:client_ip_address/:fbclid/:external_id"
            element={<Home />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
