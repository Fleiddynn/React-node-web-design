import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
axios.defaults.withCredentials = true;

const Mezunlarimiz = () => {
  const [mezunlar, setMezunlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchMezunlar = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/mezunlarimiz",
        { withCredentials: true }
      );
      setMezunlar(response.data);
    } catch (err) {
      console.error("Resimler getirilirken hata oluştu:", err);
      setError("Resimler yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMezunlar();
  }, []);

  const handleDeleteMezun = async (id) => {
    setError(null);
    setSuccessMessage(null);
    if (!window.confirm("Bu resimi silmek istediğinizden emin misiniz?")) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/mezunlarimiz/${id}`, {
        withCredentials: true,
      });
      setSuccessMessage("Resim başarıyla silindi!");
      fetchMezunlar();
    } catch (err) {
      console.error("Resim silinirken hata oluştu:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Resim silinirken bir hata oluştu.");
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center p-6 text-gray-700">
        Resimler yükleniyor...
      </div>
    );
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-6 bg-gray-50 min-h-screen"
    >
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <Link
            to="/admin"
            className="inline-flex items-center px-4 py-2 text-secondary hover:text-secondary-darker transition-colors duration-200 font-medium rounded-lg hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Admin Paneline Geri Dön</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Mezunlarımız Yönetimi
        </h1>

        {successMessage && (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="mb-6 text-right">
          <Link
            to="/admin/mezun-ekle"
            className="inline-block bg-primary hover:scale-105 text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Yeni Resim Ekle
          </Link>
        </div>

        {mezunlar.length === 0 ? (
          <p className="text-center text-gray-500">
            Henüz eklenmiş resim bulunmamaktadır.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Başlık</th>
                  <th className="py-3 px-6 text-left">Kategori</th>
                  <th className="py-3 px-6 text-center">Resim</th>
                  <th className="py-3 px-6 text-center">Oluşturma Tarihi</th>
                  <th className="py-3 px-6 text-center">İşlemler</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 text-sm font-light">
                {mezunlar.map((mezun) => (
                  <tr
                    key={mezun.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {mezun.baslik}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {mezun.kategori || "-"}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {mezun.resimYolu ? (
                        <img
                          src={`http://localhost:5000/${mezun.resimYolu}`}
                          alt={mezun.baslik}
                          className="w-20 h-20 object-cover rounded-md mx-auto"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://placehold.co/80x80/cccccc/333333?text=Resim+Yok";
                          }}
                        />
                      ) : (
                        <span className="text-gray-400">Resim Yok</span>
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      {new Date(mezun.olusturmaTarihi).toLocaleDateString(
                        "tr-TR",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleDeleteMezun(mezun.id)}
                        className="bg-primary hover:scale-110 cursor-pointer text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                      >
                        Sil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Mezunlarimiz;
