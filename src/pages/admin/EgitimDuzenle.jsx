import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
  PhotoIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";

const EgitimDuzenle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [egitim, setEgitim] = useState({
    egitimAdi: "",
    egitimAciklamasi: "",
    resimYolu: "",
    newResimFile: null,
    fiyat: "",
    onlineFiyat: "",
    kategori: "",
    egitimSuresi: "",
    egitimYeri: "",
    egitimTakvimid: "",
    egitimProgramid: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [resimPreviewUrl, setResimPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchEgitim = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/egitimler/${id}`
        );
        setEgitim(response.data);
        if (response.data.resimYolu) {
          setResimPreviewUrl(
            `http://localhost:5000/${response.data.resimYolu}`
          );
        } else {
          setResimPreviewUrl(null);
        }
      } catch (err) {
        setError("Eğitim bilgileri yüklenirken bir hata oluştu.");
        console.error("Eğitim çekerken hata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEgitim();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEgitim((prevEgitim) => ({
      ...prevEgitim,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEgitim((prevEgitim) => ({
        ...prevEgitim,
        newResimFile: file,
        resimYolu: null,
      }));
      setResimPreviewUrl(URL.createObjectURL(file));
    } else {
      setEgitim((prevEgitim) => ({
        ...prevEgitim,
        newResimFile: null,
      }));
      if (egitim.resimYolu) {
        setResimPreviewUrl(`http://localhost:5000/${egitim.resimYolu}`);
      } else {
        setResimPreviewUrl(null);
      }
    }
  };

  const handleRemoveResim = () => {
    setEgitim((prevEgitim) => ({
      ...prevEgitim,
      resimYolu: null,
      newResimFile: null,
    }));
    setResimPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    for (const key in egitim) {
      if (
        key !== "resimYolu" &&
        key !== "newResimFile" &&
        egitim[key] !== null
      ) {
        formData.append(key, egitim[key]);
      }
    }

    if (egitim.newResimFile) {
      formData.append("resim", egitim.newResimFile);
    } else if (egitim.resimYolu === null) {
      formData.append("resimYolu", "");
    } else {
      formData.append("resimYolu", egitim.resimYolu);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.put(
        `http://localhost:5000/egitimler/${id}`,
        formData,
        config
      );
      alert("Eğitim başarıyla güncellendi!");
      navigate("/admin/egitimler");
    } catch (err) {
      setError("Eğitim güncellenirken bir hata oluştu.");
      console.error(
        "Eğitim güncellerken hata:",
        err.response ? err.response.data : err.message
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg">
        Eğitim bilgileri yükleniyor...
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
    <div className="container mx-auto p-4 max-w-lg">
      <div className="absolute top-4 left-4">
        <Link
          to="/admin/egitimler"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          <span>Eğitim Listesine Geri Dön</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">
        Eğitimi Düzenle: {egitim.egitimAdi}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="egitimAdi"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Eğitim Adı:
          </label>
          <input
            type="text"
            id="egitimAdi"
            name="egitimAdi"
            value={egitim.egitimAdi}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="egitimAciklamasi"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Açıklama:
          </label>
          <textarea
            id="egitimAciklamasi"
            name="egitimAciklamasi"
            value={egitim.egitimAciklamasi}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          ></textarea>
        </div>

        {/* Resim Yükleme ve Önizleme Alanı */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Resim:
          </label>
          {resimPreviewUrl ? (
            <div
              className="relative mb-2 group cursor-pointer w-48 h-48 border border-gray-300 rounded overflow-hidden flex items-center justify-center"
              onClick={() => fileInputRef.current.click()}
            >
              {" "}
              <img
                src={resimPreviewUrl}
                alt="Eğitim Resmi"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PhotoIcon className="h-10 w-10 text-white" />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveResim();
                }}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                title="Resmi Kaldır"
              >
                <XCircleIcon className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <div
              className="mb-2 text-gray-500 border-2 border-dashed border-gray-300 rounded p-4 text-center cursor-pointer hover:border-blue-500 transition-colors flex flex-col items-center justify-center h-48 w-48 mx-auto"
              onClick={() => fileInputRef.current.click()}
            >
              <PhotoIcon className="h-12 w-12 text-gray-400 mb-2" />
              <span>Resim seçmek için tıkla</span>
            </div>
          )}
          <input
            type="file"
            id="resimFile"
            name="resimFile"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="fiyat"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Fiyat:
          </label>
          <input
            type="number"
            id="fiyat"
            name="fiyat"
            value={egitim.fiyat}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="onlineFiyat"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Online Fiyat:
          </label>
          <input
            type="number"
            id="onlineFiyat"
            name="onlineFiyat"
            value={egitim.onlineFiyat}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="kategori"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Kategori:
          </label>
          <input
            type="text"
            id="kategori"
            name="kategori"
            value={egitim.kategori}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="egitimSuresi"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Eğitim Süresi:
          </label>
          <input
            type="text"
            id="egitimSuresi"
            name="egitimSuresi"
            value={egitim.egitimSuresi}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="egitimYeri"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Eğitim Yeri:
          </label>
          <input
            type="text"
            id="egitimYeri"
            name="egitimYeri"
            value={egitim.egitimYeri}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="egitimTakvimid"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Eğitim Takvimi:
          </label>
          <input
            type="text"
            id="egitimTakvimid"
            name="egitimTakvimid"
            value={egitim.egitimTakvimid || ""}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="egitimProgramid"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Eğitim Program ID:
          </label>
          <input
            type="text"
            id="egitimProgramid"
            name="egitimProgramid"
            value={egitim.egitimProgramid}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center"
            disabled={saving}
          >
            {saving ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Kaydediliyor...
              </>
            ) : (
              <>
                <PencilSquareIcon className="h-5 w-5 mr-2" />
                Güncelle
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EgitimDuzenle;
