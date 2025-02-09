import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Anasayfa from "./pages/Anasayfa.jsx";
import Hakkimizda from "./pages/Hakkimizda.jsx";
import Header from "./components/Header.jsx";
import Hata404 from "./pages/Hata404.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="px-100">
        <Routes>
          <Route path="/" element={<Anasayfa />} />
          <Route path="/hakkimizda" element={<Hakkimizda />} />

          <Route path="*" element={<Hata404 />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
