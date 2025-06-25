import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-head">
          Admin Paneli
        </h1>

        <div className="space-y-5">
          <Link
            to="/admin/egitimler"
            className="block w-full text-center bg-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Eğitimleri Yönet
          </Link>
          <Link
            to="/admin/egitim-programlari"
            className="block w-full text-center bg-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Eğitim Programı Yapılarını Yönet
          </Link>
          <Link
            to="/admin/tablolar"
            className="block w-full text-center bg-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Tabloları Görüntüle
          </Link>
          <Link
            to="/"
            className="block w-full text-center bg-secondary text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            Siteye Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Admin;
