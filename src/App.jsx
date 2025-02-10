import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header.jsx";
import Hata404 from "./pages/Hata404.jsx";
import { navLinks } from "./data/navLinks.jsx";

const App = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto px-3 sm:px-9 lg:px-15">
        <Routes>
          {navLinks.map((link, index) => (
            <Route key={index} path={link.to} element={link.component} />
          ))}
          <Route path="*" element={<Hata404 />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
