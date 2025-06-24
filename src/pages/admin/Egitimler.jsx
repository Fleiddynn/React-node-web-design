import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Egitimler = () => {
  const [egitimler, setEgitimler] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEgitimler = async () => {
      try {
        const response = await axios.get("http://localhost:5000/egitimler");
        setEgitimler(response.data);
      } catch (err) {
        setError("Eğitimler yüklenirken bir hata oluştu.");
        console.error("Eğitimleri çekerken hata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEgitimler();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Bu eğitimi silmek istediğinizden emin misiniz?")) {
      try {
        await axios.delete(`http://localhost:5000/egitimler/${id}`);
        setEgitimler(egitimler.filter((egitim) => egitim.id !== id));
        alert("Eğitim başarıyla silindi!");
      } catch (err) {
        setError("Eğitim silinirken bir hata oluştu.");
        console.error("Eğitim silerken hata:", err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Yükleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="absolute top-4 left-4">
        <Link
          to="/admin"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          <span>Admin Paneline Geri Dön</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Eğitim Listesi</h1>

      {egitimler.length === 0 ? (
        <p className="text-center text-gray-600">
          Henüz hiç eğitim bulunmamaktadır.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {egitimler.map((egitim) => (
            <div
              key={egitim.id}
              className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between"
            >
              <span className="text-lg font-medium text-gray-800">
                {egitim.egitimAdi}
              </span>
              <div className="flex space-x-3">
                <Link
                  to={`/admin/egitim-duzenle/${egitim.id}`} // Yeni rota
                  className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  title="Düzenle"
                >
                  <PencilIcon className="h-5 w-5" />
                </Link>

                {/* Silme Sembolü */}
                <button
                  className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  onClick={() => handleDelete(egitim.id)}
                  title="Sil"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Egitimler;
