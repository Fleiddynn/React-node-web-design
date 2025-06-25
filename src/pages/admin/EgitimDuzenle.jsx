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

const EgitimDuzenle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [egitim, setEgitim] = useState({
    egitimAdi: "",
    egitimAciklamasi: "",
    resimYolu: "", // Existing image path from backend
    newResimFile: null, // New file selected by user
    fiyat: "",
    onlineFiyat: "",
    kategori: "",
    egitimSuresi: "",
    egitimYeri: "",
    egitimTakvimid: "", // Will be set from MiniCourseCalendar selection
    egitimProgramid: "", // Will be a manual input
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [resimPreviewUrl, setResimPreviewUrl] = useState(null);

  const [programs, setPrograms] = useState([]); // State to hold available programs
  const [showProgramSelectionModal, setShowProgramSelectionModal] =
    useState(false); // Modal visibility
  const [selectedProgramDetails, setSelectedProgramDetails] = useState(null); // Details of selected calendar program

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
        // Fetch Egitim details
        const egitimResponse = await axios.get(
          `http://localhost:5000/egitimler/${id}`
        );
        const fetchedEgitim = egitimResponse.data;

        setEgitim({
          ...fetchedEgitim,
          // Ensure numbers are not null if backend sends 0 or null for empty fields
          fiyat: fetchedEgitim.fiyat || "",
          onlineFiyat: fetchedEgitim.onlineFiyat || "",
          // New: Initialize egitimTakvimid and egitimProgramid separately
          egitimTakvimid: fetchedEgitim.egitimTakvimid || "", // Use existing if available
          egitimProgramid: fetchedEgitim.egitimProgramid || "", // Use existing if available
          newResimFile: null, // Always null on initial fetch
        });

        if (fetchedEgitim.resimYolu) {
          setResimPreviewUrl(
            `http://localhost:5000/${fetchedEgitim.resimYolu}`
          );
        } else {
          setResimPreviewUrl(null);
        }

        // Fetch Programs
        const programsResponse = await axios.get(
          "http://localhost:5000/api/programs"
        );
        setPrograms(programsResponse.data);

        // Set initial selected program details based on fetched egitimTakvimid
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
  }, [id]); // Depend on 'id' to refetch if the ID changes

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
        resimYolu: "", // Clear existing path if a new file is uploaded
      }));
      setResimPreviewUrl(URL.createObjectURL(file));
    } else {
      setEgitim((prevEgitim) => ({
        ...prevEgitim,
        newResimFile: null,
      }));
      // If no new file, revert to original resimYolu if it existed, or null
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
      resimYolu: null, // Signal to backend to remove image
      newResimFile: null,
    }));
    setResimPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear file input value
    }
  };

  const handleProgramSelect = (program) => {
    // Only update egitimTakvimid with the selected program's ID
    setEgitim((prev) => ({
      ...prev,
      egitimTakvimid: program.id,
    }));
    setSelectedProgramDetails(program); // Store full program details for display
    setShowProgramSelectionModal(false); // Close modal after selection
  };

  const clearSelectedProgram = () => {
    // Only clear egitimTakvimid, leave egitimProgramid untouched
    setEgitim((prev) => ({ ...prev, egitimTakvimid: "" }));
    setSelectedProgramDetails(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData();
    // Append all relevant fields from the egitim state
    for (const key in egitim) {
      // Exclude 'newResimFile' from direct appending, handle 'resimYolu' separately
      if (key !== "newResimFile" && key !== "resimYolu") {
        // Append value only if it's not null or empty string, or if it's explicitly a number
        // This prevents sending "null" or "" for fields that should be empty or default.
        if (egitim[key] !== null && egitim[key] !== "") {
          formData.append(key, egitim[key]);
        }
      }
    }

    // Handle image file or explicit removal
    if (egitim.newResimFile) {
      formData.append("resim", egitim.newResimFile);
    } else if (egitim.resimYolu === null) {
      formData.append("resimYolu", ""); // Explicitly send empty string to backend to remove old image
    } else if (egitim.resimYolu) {
      // If there's an existing image and no new one, send the path (without base URL)
      // Ensure you only send the relative path, not the full localhost URL
      const relativePath = egitim.resimYolu.replace(
        "http://localhost:5000/",
        ""
      );
      formData.append("resimYolu", relativePath);
    }

    // --- Debugging: Log FormData content before sending ---
    console.log("Sending FormData for Update:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    // --- End Debugging ---

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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 sm:p-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-6 sm:p-8 relative">
        {/* Adjusted Back Button Positioning */}
        <div className="mb-6">
          <Link
            to="/admin/egitimler"
            className="inline-flex items-center px-4 py-2 text-primary hover:text-primary-darker transition-colors duration-200 font-medium rounded-lg hover:bg-gray-100"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            <span>Eğitim Listesine Geri Dön</span>
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-head leading-tight">
          Eğitimi Düzenle:{" "}
          <span className="text-primary break-words">{egitim.egitimAdi}</span>
        </h1>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          {/* Left Column for Name, Description, Image */}
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

            {/* Resim Yükleme ve Önizleme Alanı */}
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
                      e.stopPropagation(); // Prevent file input click
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

          {/* Right Column for other fields */}
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

            {/* Category Dropdown */}
            <div className="mb-6">
              <label
                htmlFor="kategori"
                className="block text-head text-sm font-semibold mb-2"
              >
                Kategori:
              </label>
              <select
                id="kategori"
                name="kategori"
                value={egitim.kategori}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
                required
              >
                <option value="" disabled>
                  Kategori Seçiniz
                </option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
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

            {/* NEW: Manual Input for egitimProgramid */}
            <div className="mb-6">
              <label
                htmlFor="egitimProgramid"
                className="block text-head text-sm font-semibold mb-2"
              >
                Eğitim Program ID (Manuel):
              </label>
              <input
                type="text" // Use "text" for flexibility with IDs, or "number" if strictly numeric
                id="egitimProgramid"
                name="egitimProgramid"
                value={egitim.egitimProgramid}
                onChange={handleChange}
                placeholder="Manuel Program ID giriniz"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition duration-200"
              />
            </div>

            {/* Existing: Selector for egitimTakvimid using MiniCourseCalendar */}
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
                    onSelect={() => {}} // No-op as it's just for display
                    isSelected={true}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Submit Button - Spans both columns */}
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

      {/* Program Selection Modal */}
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
