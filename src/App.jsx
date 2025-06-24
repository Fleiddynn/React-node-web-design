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
import AdminLogin from "./pages/admin/AdminLogin.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Admin from "./pages/admin/Admin.jsx";
import EgitimEkle from "./pages/admin/EgitimEkle.jsx";
import EgitimDuzenle from "./pages/admin/EgitimDuzenle.jsx";
import Egitimler from "./pages/admin/Egitimler.jsx";

function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="container mx-auto px-3 sm:px-9 lg:px-15">
        <Routes>
          {navLinks.map((link, index) => (
            <Route key={index} path={link.to} element={link.component} />
          ))}

          <Route path="/admin/giris" element={<AdminLogin />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/egitim-ekle"
            element={
              <ProtectedRoute>
                <EgitimEkle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/egitim-duzenle/:id"
            element={
              <ProtectedRoute>
                <EgitimDuzenle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/egitimler"
            element={
              <ProtectedRoute>
                <Egitimler />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Hata404 />} />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
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
