import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <div className="min-h-screen p-10 bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">Admin Paneli</h1>
      <div className="space-y-4">
        <Link
          to="/admin/egitim-ekle"
          className="block bg-secondary text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
        >
          Eğitim Ekle
        </Link>
        <Link
          to="/admin/egitimler"
          className="block bg-secondary text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
        >
          Eğitimler
        </Link>
        <Link
          to="/admin/tablolar"
          className="block bg-secondary text-white py-2 px-4 rounded hover:bg-blue-600 cursor-pointer"
        >
          Tablolar
        </Link>
      </div>
    </div>
  );
};

export default Admin;
