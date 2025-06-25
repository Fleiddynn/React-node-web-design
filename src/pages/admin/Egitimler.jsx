import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PencilIcon,
  TrashIcon,
  ArrowLeftIcon,
  PlusCircleIcon,
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
      <div className="flex justify-center items-center h-screen text-lg text-gray-700">
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
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <Link
          to="/admin"
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          <span className="font-medium">Admin Paneline Geri Dön</span>
        </Link>

        <h1 className="text-3xl font-bold text-gray-800">Eğitim Listesi</h1>

        <Link
          to="/admin/egitim-ekle"
          className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors duration-200"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Yeni Eğitim Ekle
        </Link>
      </div>

      {egitimler.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">
          Henüz hiç eğitim bulunmamaktadır. Yeni bir eğitim eklemek için sağ
          üstteki butonu kullanın.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {egitimler.map((egitim) => (
            <div
              key={egitim.id}
              className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between border border-gray-200 hover:shadow-xl transition-shadow duration-200"
            >
              <span className="text-xl font-semibold text-gray-800">
                {egitim.egitimAdi}
              </span>
              <div className="flex space-x-3">
                <Link
                  to={`/admin/egitim-duzenle/${egitim.id}`}
                  className="text-blue-600 hover:text-blue-800 p-2 rounded-full hover:bg-blue-50 transition-colors duration-200"
                  title="Düzenle"
                >
                  <PencilIcon className="h-5 w-5" />
                </Link>

                <button
                  className="text-red-600 hover:text-red-800 p-2 rounded-full hover:bg-red-50 transition-colors duration-200"
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
