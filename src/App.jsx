import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header.jsx";
import Hata404 from "./pages/Hata404.jsx";
import { navLinks } from "./data/navLinks.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

function Layout() {
  const location = useLocation();

  return (
    <>
      <Header />
      <main className="container mx-auto px-3 sm:px-9 lg:px-15">
        <Routes>
          {navLinks.map((link, index) => (
            <Route key={index} path={link.to} element={link.component} />
          ))}
          <Route path="*" element={<Hata404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Layout />
    </Router>
  );
}

export default App;
