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
import TabloDuzenle from "./pages/admin/TabloDuzenle.jsx";
import TabloEkle from "./pages/admin/TabloEkle.jsx";
import Tablolar from "./pages/admin/Tablolar.jsx";
import EgitimProgramlariListesi from "./pages/admin/EgitimProgramlariListesi.jsx";
import EgitimProgramiEkle from "./pages/admin/EgitimProgramiEkle.jsx";
import EgitimProgramiDuzenle from "./pages/admin/EgitimProgramiDuzenle.jsx";
import SinglePostPage from "./pages/SinglePostPage.jsx";
import MezunEkle from "./pages/admin/MezunEkle.jsx";
import Mezunlarimiz from "./pages/admin/Mezunlarimiz.jsx";

function Layout() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  const allRoutes = [];
  navLinks.forEach((link) => {
    if (link.group) {
      allRoutes.push({ to: link.to, component: link.component });
      link.children.forEach((childLink) => {
        allRoutes.push({ to: childLink.to, component: childLink.component });
      });
    } else {
      allRoutes.push({ to: link.to, component: link.component });
    }
  });

  return (
    <>
      {!isAdminRoute && <Header />}
      <main className="container mx-auto px-3 sm:px-9 lg:px-15">
        <Routes>
          {allRoutes.map((link) => (
            <Route key={link.to} path={link.to} element={link.component} />
          ))}

          <Route path="/egitimler/:id" element={<SinglePostPage />} />

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
            path="/admin/egitimler"
            element={
              <ProtectedRoute>
                <Egitimler />
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
            path="/admin/tablolar"
            element={
              <ProtectedRoute>
                <Tablolar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tablo-ekle"
            element={
              <ProtectedRoute>
                <TabloEkle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/tablo-duzenle/:id"
            element={
              <ProtectedRoute>
                <TabloDuzenle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/egitim-programlari"
            element={
              <ProtectedRoute>
                <EgitimProgramlariListesi />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/egitim-programlari/ekle"
            element={
              <ProtectedRoute>
                <EgitimProgramiEkle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/egitim-programlari/duzenle/:id"
            element={
              <ProtectedRoute>
                <EgitimProgramiDuzenle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/mezunlarimiz"
            element={
              <ProtectedRoute>
                <Mezunlarimiz />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/mezun-ekle"
            element={
              <ProtectedRoute>
                <MezunEkle />
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
