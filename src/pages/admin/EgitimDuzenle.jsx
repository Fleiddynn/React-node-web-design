import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  PencilSquareIcon,
  PhotoIcon,
  XCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import MiniCourseCalendar from "./../../components/MiniCourseCalendar.jsx";
axios.defaults.withCredentials = true;

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
    kategori: [],
    egitimSuresi: "",
    egitimYeri: "",
    egitimTakvimid: "",
    egitimProgramid: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [resimPreviewUrl, setResimPreviewUrl] = useState(null);

  const [programs, setPrograms] = useState([]);
  const [showProgramSelectionModal, setShowProgramSelectionModal] =
    useState(false);
  const [selectedProgramDetails, setSelectedProgramDetails] = useState(null);

  const [egitimProgramlariList, setEgitimProgramlariList] = useState([]);

  const categories = [
    "Güncel Eğitimler",
    "Şehir Eğitimleri",
    "Uzmanlık Eğitimleri",
    "Yetkinlik Eğitimleri",
    "Gümrük Eğitimleri",
    "Lojistik Eğitimleri",
    "Sektörel Eğitimler",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const egitimResponse = await axios.get(
          `http://localhost:5000/egitimler/${id}`
        );
        const fetchedEgitim = egitimResponse.data;

        const programsResponse = await axios.get(
          "http://localhost:5000/api/programs"
        );
        setPrograms(programsResponse.data);

        const egitimProgramlariResponse = await axios.get(
          "http://localhost:5000/api/egitim-programlari"
        );
        setEgitimProgramlariList(egitimProgramlariResponse.data);

        setEgitim({
          ...fetchedEgitim,
          fiyat: fetchedEgitim.fiyat || "",
          onlineFiyat: fetchedEgitim.onlineFiyat || "",
          egitimTakvimid: fetchedEgitim.egitimTakvimid || "",
          egitimProgramid: fetchedEgitim.egitimProgramid || "",
          newResimFile: null,
          kategori: fetchedEgitim.kategori
            ? fetchedEgitim.kategori.split(",").map((k) => k.trim())
            : [],
        });

        if (fetchedEgitim.resimYolu) {
          setResimPreviewUrl(
            `http://localhost:5000/${fetchedEgitim.resimYolu}`
          );
        } else {
          setResimPreviewUrl(null);
        }

        if (fetchedEgitim.egitimTakvimid) {
          const initialProgram = programsResponse.data.find(
            (p) => p.id === fetchedEgitim.egitimTakvimid
          );
          if (initialProgram) {
            setSelectedProgramDetails(initialProgram);
          }
        }
      } catch (err) {
        setError("Bilgiler yüklenirken bir hata oluştu.");
        console.error("Veri çekerken hata:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        resimYolu: "",
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

  const handleProgramSelect = (program) => {
    setEgitim((prev) => ({
      ...prev,
      egitimTakvimid: program.id,
    }));
    setSelectedProgramDetails(program);
    setShowProgramSelectionModal(false);
  };

  const clearSelectedProgram = () => {
    setEgitim((prev) => ({ ...prev, egitimTakvimid: "" }));
    setSelectedProgramDetails(null);
  };

  const handleKategoriToggle = (clickedCategory) => {
    setEgitim((prev) => {
      const alreadySelected = prev.kategori.includes(clickedCategory);
      return {
        ...prev,
        kategori: alreadySelected
          ? prev.kategori.filter((k) => k !== clickedCategory)
          : [...prev.kategori, clickedCategory],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    for (const key in egitim) {
      if (key !== "newResimFile" && key !== "resimYolu") {
        if (egitim[key] !== null && egitim[key] !== "") {
          formData.append(key, egitim[key]);
        }
      }
    }
    formData.append("kategori", egitim.kategori.join(","));

    if (egitim.newResimFile) {
      formData.append("resim", egitim.newResimFile);
    } else if (egitim.resimYolu === null) {
      formData.append("resimYolu", "");
    } else if (egitim.resimYolu) {
      const relativePath = egitim.resimYolu.replace(
        "http://localhost:5000/",
        ""
      );
      formData.append("resimYolu", relativePath);
    }

    console.log("Sending FormData for Update:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
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
      <div className="flex justify-center items-center min-h-screen text-lg text-head">
        Eğitim bilgileri yükleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600 text-lg">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 sm:p-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 sm:p-8 relative">
        <div className="mb-6">
          <Link
            to="/admin/egitimler"
            className="inline-flex items-center px-4 py-2 text-primary hover:text-primary-darker transition-colors duration-200 font-medium rounded-lg hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Eğitim Listesine Geri Dön</span>
          </Link>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-head leading-tight">
          Eğitimi Düzenle:{" "}
          <span className="text-primary break-words">{egitim.egitimAdi}</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          <div className="md:col-span-1">
            <div className="mb-6">
              <label
                htmlFor="egitimAdi"
                className="block text-head text-sm font-semibold mb-2"
              >
                Eğitim Adı:
              </label>
              <input
                type="text"
                id="egitimAdi"
                name="egitimAdi"
                value={egitim.egitimAdi}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="egitimAciklamasi"
                className="block text-head text-sm font-semibold mb-2"
              >
                Açıklama:
              </label>
              <textarea
                id="egitimAciklamasi"
                name="egitimAciklamasi"
                value={egitim.egitimAciklamasi}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200 resize-y"
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-head text-sm font-semibold mb-2">
                Eğitim Resmi:
              </label>
              {resimPreviewUrl ? (
                <div
                  className="relative group cursor-pointer w-full h-56 border-2 border-gray-300 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 hover:border-primary transition-colors duration-200"
                  onClick={() => fileInputRef.current.click()}
                >
                  <img
                    src={resimPreviewUrl}
                    alt="Eğitim Resmi"
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
                  className="w-full h-56 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-center cursor-pointer hover:border-primary transition-colors duration-200"
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
                id="resimFile"
                name="resimFile"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="mb-6">
              <label
                htmlFor="fiyat"
                className="block text-head text-sm font-semibold mb-2"
              >
                Fiyat:
              </label>
              <input
                type="number"
                id="fiyat"
                name="fiyat"
                value={egitim.fiyat}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="onlineFiyat"
                className="block text-head text-sm font-semibold mb-2"
              >
                Online Fiyat:
              </label>
              <input
                type="number"
                id="onlineFiyat"
                name="onlineFiyat"
                value={egitim.onlineFiyat}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              />
            </div>

            <div className="mb-6">
              <label className="block text-head text-sm font-semibold mb-2">
                Kategoriler:
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleKategoriToggle(cat)}
                    className={`px-4 py-2 rounded-full border ${
                      egitim.kategori.includes(cat)
                        ? "bg-primary text-white border-primary"
                        : "bg-white text-gray-700 border-gray-300"
                    } hover:bg-primary hover:text-white transition`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="egitimSuresi"
                className="block text-head text-sm font-semibold mb-2"
              >
                Eğitim Süresi:
              </label>
              <input
                type="text"
                id="egitimSuresi"
                name="egitimSuresi"
                value={egitim.egitimSuresi}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="egitimYeri"
                className="block text-head text-sm font-semibold mb-2"
              >
                Eğitim Yeri:
              </label>
              <input
                type="text"
                id="egitimYeri"
                name="egitimYeri"
                value={egitim.egitimYeri}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="egitimProgramid"
                className="block text-head text-sm font-semibold mb-2"
              >
                Eğitim Programı:
              </label>
              <select
                id="egitimProgramid"
                name="egitimProgramid"
                value={egitim.egitimProgramid}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              >
                <option value="">Program Seçiniz (İsteğe Bağlı)</option>
                {egitimProgramlariList.map((program) => (
                  <option key={program.id} value={program.id}>
                    ID: {program.id} - {program.program_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label
                htmlFor="egitimTakvimid"
                className="block text-head text-sm font-semibold mb-2"
              >
                Eğitim Takvim ID (Tablodan Seç):
              </label>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setShowProgramSelectionModal(true)}
                  className="flex-grow flex items-center justify-center bg-secondary text-white px-4 py-3 rounded-lg shadow-md hover:bg-secondary-darker focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 transition-all duration-300"
                >
                  <CalendarDaysIcon className="h-5 w-5 mr-2" />
                  {selectedProgramDetails
                    ? `Seçili Takvim: ID ${selectedProgramDetails.id}`
                    : "Takvim Seç"}
                </button>
                {selectedProgramDetails && (
                  <button
                    type="button"
                    onClick={clearSelectedProgram}
                    className="p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    title="Seçimi Temizle"
                  >
                    <XCircleIcon className="h-6 w-6" />
                  </button>
                )}
              </div>
              {selectedProgramDetails && (
                <div className="mt-4 border border-gray-200 rounded-lg p-2">
                  <MiniCourseCalendar
                    program={selectedProgramDetails}
                    onSelect={() => {}}
                    isSelected={true}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end mt-4">
            <button
              type="submit"
              className="bg-primary hover:bg-primary-darker text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 flex items-center justify-center"
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

      {showProgramSelectionModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <h3 className="text-2xl font-bold mb-6 text-head">
              Eğitim Takvimi Seç
            </h3>
            <button
              onClick={() => setShowProgramSelectionModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
            >
              <XCircleIcon className="h-7 w-7" />
            </button>
            {programs.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                Henüz hiç program bulunmuyor.
              </p>
            ) : (
              <ul className="space-y-4">
                {programs.map((program) => (
                  <li key={program.id}>
                    <MiniCourseCalendar
                      program={program}
                      onSelect={handleProgramSelect}
                      isSelected={egitim.egitimTakvimid === program.id}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EgitimDuzenle;
