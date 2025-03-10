import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Hata404 from "./pages/Hata404.jsx";
import { navLinks } from "./data/navLinks.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import PostList from "./pages/admin/PostList.jsx";
import PostForm from "./pages/admin/PostForm.jsx";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
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
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<PostList />} />
          <Route path="posts/new" element={<PostForm />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
