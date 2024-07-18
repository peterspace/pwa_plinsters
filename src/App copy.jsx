import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <div className="w-full h-screen bg-figma-400">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register/:sub_id_1/:sub_id_2" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
