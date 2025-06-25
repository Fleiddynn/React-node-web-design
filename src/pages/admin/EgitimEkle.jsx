import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {
  ArrowLeftIcon,
  CalendarDaysIcon,
  XMarkIcon,
  PhotoIcon,
} from "@heroicons/react/24/solid";
import MiniCourseCalendar from "./../../components/MiniCourseCalendar.jsx";

const EgitimEkle = () => {
  const [form, setForm] = useState({
    egitimAdi: "",
    egitimAciklamasi: "",
    fiyat: "",
    onlineFiyat: "",
    kategori: [],
    egitimSuresi: "",
    egitimYeri: "",
    egitimProgramid: "",
    egitimTakvimid: "",
  });

  const [resim, setResim] = useState(null);
  const [hata, setHata] = useState("");
  const navigate = useNavigate();

  const [calendarPrograms, setCalendarPrograms] = useState([]);
  const [egitimProgramlari, setEgitimProgramlari] = useState([]);
  const [showProgramSelection, setShowProgramSelection] = useState(false);
  const [selectedCalendarProgramDetails, setSelectedCalendarProgramDetails] =
    useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

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
    const fetchAllData = async () => {
      try {
        const calendarResponse = await axios.get(
          "http://localhost:5000/api/programs"
        );
        setCalendarPrograms(calendarResponse.data);

        const egitimProgramlariResponse = await axios.get(
          "http://localhost:5000/api/egitim-programlari"
        );
        setEgitimProgramlari(egitimProgramlariResponse.data);

        if (form.egitimTakvimid) {
          const initialProgram = calendarResponse.data.find(
            (p) => p.id === form.egitimTakvimid
          );
          if (initialProgram) {
            setSelectedCalendarProgramDetails(initialProgram);
          }
        }
      } catch (err) {
        console.error("Veriler çekilirken hata oluştu:", err);
        setHata("Gerekli veriler yüklenirken bir hata oluştu.");
      }
    };
    fetchAllData();
  }, [form.egitimTakvimid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResim(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setResim(null);
      setImagePreviewUrl(null);
    }
  };

  const clearImage = () => {
    setResim(null);
    setImagePreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleProgramSelect = (program) => {
    setForm((prev) => ({
      ...prev,
      egitimTakvimid: program.id,
    }));
    setSelectedCalendarProgramDetails(program);
    setShowProgramSelection(false);
  };

  const clearSelectedProgram = () => {
    setForm((prev) => ({ ...prev, egitimTakvimid: "" }));
    setSelectedCalendarProgramDetails(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.egitimAdi ||
      !form.kategori ||
      !form.egitimProgramid ||
      !form.egitimTakvimid
    ) {
      setHata(
        "Lütfen Eğitim Adı, Kategori, Eğitim Program Yapısı ve Eğitim Takvim ID alanlarını doldurunuz."
      );
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (key === "fiyat" || key === "onlineFiyat" || key === "egitimSuresi") {
        formData.append(key, val === "" ? "" : val);
      } else if (val !== null && val !== undefined) {
        formData.append(key, val);
      } else if (key === "kategori" && Array.isArray(val)) {
        formData.append(key, val.join(","));
      }
    });
    if (resim) formData.append("resim", resim);

    console.log("Sending FormData:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/egitimler",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        navigate("/admin/egitimler");
      }
    } catch (err) {
      console.error("Eğitim eklenirken hata oluştu:", err);
      if (err.response && err.response.data && err.response.data.error) {
        setHata(`Eğitim eklenirken hata oluştu: ${err.response.data.error}`);
      } else {
        setHata(
          "Eğitim eklenirken bir hata oluştu. Lütfen tüm alanları kontrol edin."
        );
      }
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-xl my-8 relative">
      <div className="absolute top-4 left-4">
        <Link
          to="/admin/egitimler"
          className="flex items-center text-blue-700 hover:text-blue-900 transition duration-300 ease-in-out"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          <span className="font-medium">Eğitimlere Geri Dön</span>
        </Link>
      </div>

      <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
        Yeni Eğitim Ekle
      </h2>
      {hata && (
        <p className="text-red-600 bg-red-100 border border-red-400 rounded-md p-3 mb-4 text-center">
          {hata}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label
            htmlFor="egitimAdi"
            className="block text-sm font-medium text-gray-700"
          >
            Eğitim Adı <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="egitimAdi"
            name="egitimAdi"
            placeholder="Eğitim Adı"
            value={form.egitimAdi}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-700 focus:border-blue-700 sm:text-sm"
            required
          />
        </div>

        <div>
          <label
            htmlFor="egitimAciklamasi"
            className="block text-sm font-medium text-gray-700"
          >
            Açıklama
          </label>
          <textarea
            id="egitimAciklamasi"
            name="egitimAciklamasi"
            placeholder="Açıklama"
            value={form.egitimAciklamasi}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-700 focus:border-blue-700 sm:text-sm"
            rows={4}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="fiyat"
              className="block text-sm font-medium text-gray-700"
            >
              Fiyat (TL)
            </label>
            <input
              type="number"
              id="fiyat"
              name="fiyat"
              placeholder="Fiyat"
              value={form.fiyat}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-700 focus:border-blue-700 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="onlineFiyat"
              className="block text-sm font-medium text-gray-700"
            >
              Online Fiyat (TL)
            </label>
            <input
              type="number"
              id="onlineFiyat"
              name="onlineFiyat"
              placeholder="Online Fiyat"
              value={form.onlineFiyat}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-700 focus:border-blue-700 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategoriler <span className="text-red-500">*</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = form.kategori.includes(cat);
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      kategori: isSelected
                        ? prev.kategori.filter((k) => k !== cat)
                        : [...prev.kategori, cat],
                    }));
                  }}
                  className={`px-3 py-2 rounded-full text-sm font-medium border ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                  } transition`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          {form.kategori.length === 0 && (
            <p className="text-red-500 text-xs mt-1">
              En az bir kategori seçiniz.
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="egitimSuresi"
              className="block text-sm font-medium text-gray-700"
            >
              Süre (Saat)
            </label>
            <input
              type="number"
              id="egitimSuresi"
              name="egitimSuresi"
              placeholder="Süre (saat)"
              value={form.egitimSuresi}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-700 focus:border-blue-700 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="egitimYeri"
              className="block text-sm font-medium text-gray-700"
            >
              Eğitim Yeri
            </label>
            <input
              type="text"
              id="egitimYeri"
              name="egitimYeri"
              placeholder="Yer"
              value={form.egitimYeri}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-700 focus:border-blue-700 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="egitimProgramid"
            className="block text-sm font-medium text-gray-700"
          >
            Eğitim Program Yapısı <span className="text-red-500">*</span>
          </label>
          <select
            id="egitimProgramid"
            name="egitimProgramid"
            value={form.egitimProgramid}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-white focus:ring-blue-700 focus:border-blue-700 sm:text-sm"
            required
          >
            <option value="" disabled>
              Program Yapısı Seçiniz
            </option>
            {egitimProgramlari.map((program) => (
              <option key={program.id} value={program.id}>
                {program.program_name} (ID: {program.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="egitimTakvimid"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Eğitim Takvim ID (Tablodan Seç){" "}
            <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={() => setShowProgramSelection(true)}
              className="flex items-center justify-center bg-secondary text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition duration-300 ease-in-out w-full cursor-pointer"
            >
              <CalendarDaysIcon className="h-5 w-5 mr-2" />
              {selectedCalendarProgramDetails
                ? `Seçili Takvim: ID ${selectedCalendarProgramDetails.id}`
                : "Takvim Seç"}
            </button>
            {selectedCalendarProgramDetails && (
              <button
                type="button"
                onClick={clearSelectedProgram}
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition duration-300 ease-in-out cursor-pointer"
                title="Seçimi Temizle"
              >
                <XMarkIcon className="h-5 w-5 text-gray-600" />
              </button>
            )}
          </div>
          {selectedCalendarProgramDetails && (
            <div className="mt-4">
              <MiniCourseCalendar
                program={selectedCalendarProgramDetails}
                onSelect={() => {}}
                isSelected={true}
              />
            </div>
          )}
          {form.egitimTakvimid === "" && (
            <p className="text-red-500 text-xs mt-1">
              Lütfen bir eğitim takvimi seçiniz.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="resim"
            className="block text-sm font-medium text-gray-700"
          >
            Resim Yükle
          </label>
          <div className="flex items-center space-x-2 mt-1">
            <label
              htmlFor="resim"
              className="flex-grow flex items-center justify-center border border-gray-300 rounded-md shadow-sm p-3 bg-white text-gray-700 cursor-pointer hover:bg-gray-50 transition duration-300 ease-in-out"
            >
              <PhotoIcon className="h-5 w-5 mr-2 text-gray-500" />
              {resim ? resim.name : "Dosya Seç"}
            </label>
            <input
              type="file"
              id="resim"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
            {imagePreviewUrl && (
              <button
                type="button"
                onClick={clearImage}
                className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition duration-300 ease-in-out cursor-pointer"
                title="Resmi Kaldır"
              >
                <XMarkIcon className="h-5 w-5 text-red-600" />
              </button>
            )}
          </div>
          {imagePreviewUrl && (
            <div className="mt-2 w-32 h-32 overflow-hidden rounded-md border border-gray-200">
              <img
                src={imagePreviewUrl}
                alt="Resim Önizleme"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white px-4 py-3 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 transition duration-300 ease-in-out text-lg font-semibold cursor-pointer"
          disabled={
            !form.egitimProgramid ||
            !form.egitimTakvimid ||
            !form.egitimAdi ||
            !form.kategori
          }
        >
          Eğitimi Ekle
        </button>
      </form>

      {showProgramSelection && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto relative">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Eğitim Takvimi Seç
            </h3>
            <button
              onClick={() => setShowProgramSelection(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            {calendarPrograms.length === 0 ? (
              <p className="text-gray-600">
                Henüz hiç takvim programı bulunmuyor.
              </p>
            ) : (
              <ul className="space-y-4">
                {calendarPrograms.map((program) => (
                  <li key={program.id}>
                    <MiniCourseCalendar
                      program={program}
                      onSelect={handleProgramSelect}
                      isSelected={form.egitimTakvimid === program.id}
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

export default EgitimEkle;
