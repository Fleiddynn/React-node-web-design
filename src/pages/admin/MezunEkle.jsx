import React, { useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { PhotoIcon, XCircleIcon } from "@heroicons/react/24/solid";

const MezunEkle = () => {
  const [baslik, setBaslik] = useState("");
  const [resimDosyasi, setResimDosyasi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [resimPreviewUrl, setResimPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResimDosyasi(file);
      setResimPreviewUrl(URL.createObjectURL(file));
    } else {
      setResimDosyasi(null);
      setResimPreviewUrl(null);
    }
  };

  const handleRemoveResim = () => {
    setResimDosyasi(null);
    setResimPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAddMezun = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    const formData = new FormData();
    formData.append("baslik", baslik);
    if (resimDosyasi) {
      formData.append("resim", resimDosyasi);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/mezunlarimiz",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setSuccessMessage("Mezun başarıyla eklendi!");
        setBaslik("");
        handleRemoveResim();
        setTimeout(() => {
          navigate("/admin/mezunlarimiz");
        }, 500);
      }
    } catch (err) {
      console.error("Mezun eklenirken hata oluştu:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError("Mezun eklenirken bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-6 bg-gray-50 min-h-screen flex items-center justify-center"
    >
      <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Yeni Mezun Ekle
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

        <form onSubmit={handleAddMezun} className="space-y-6">
          <div>
            <label
              htmlFor="baslik"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mezun Başlığı:
            </label>
            <input
              type="text"
              id="baslik"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              value={baslik}
              onChange={(e) => setBaslik(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mezun Resmi:
            </label>
            {resimPreviewUrl ? (
              <div
                className="relative group cursor-pointer w-full h-56 border-2 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 hover:border-orange-500 transition-colors duration-200"
                onClick={() => fileInputRef.current.click()}
              >
                <img
                  src={resimPreviewUrl}
                  alt="Mezun Resmi Önizleme"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <PhotoIcon className="h-12 w-12 text-white" />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveResim();
                  }}
                  className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                  title="Resmi Kaldır"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <div
                className="w-full h-56 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-500 transition-colors duration-200"
                onClick={() => fileInputRef.current.click()}
              >
                <PhotoIcon className="h-16 w-16 text-gray-400 mb-3" />
                <span className="text-gray-600 font-medium">
                  Resim seçmek için tıkla veya sürükle
                </span>
              </div>
            )}
            <input
              type="file"
              id="resimInput"
              name="resimFile"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              ref={fileInputRef}
              disabled={loading}
            />
          </div>

          <div className="flex justify-between space-x-4">
            <button
              type="button"
              onClick={() => navigate("/admin/mezunlarimiz")}
              className="w-full bg-secondary hover:bg-secondary/90 hover:scale-105 text-white cursor-pointer font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              disabled={loading}
            >
              Geri Dön
            </button>
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 hover:scale-105 cursor-pointer text-white font-bold py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              disabled={loading}
            >
              {loading ? "Ekleniyor..." : "Mezun Ekle"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default MezunEkle;
