import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const EgitimEkle = () => {
  const [form, setForm] = useState({
    egitimAdi: "",
    egitimAciklamasi: "",
    fiyat: "",
    onlineFiyat: "",
    kategori: "",
    egitimSuresi: "",
    egitimYeri: "",
    egitimTakvimid: "",
    egitimProgramid: "",
  });
  const [resim, setResim] = useState(null);
  const [hata, setHata] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResim(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => formData.append(key, val));
    if (resim) formData.append("resim", resim);

    try {
      const response = await axios.post(
        "http://localhost:5000/egitimler",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        navigate("/admin");
      }
    } catch (err) {
      setHata("Eğitim eklenirken hata oluştu.");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="absolute top-4 left-4">
        <Link
          to="/admin"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          <span>Admin Paneline Geri Dön</span>
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-4">Yeni Eğitim Ekle</h2>
      {hata && <p className="text-red-600 mb-2">{hata}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="egitimAdi"
          placeholder="Eğitim Adı"
          value={form.egitimAdi}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="egitimAciklamasi"
          placeholder="Açıklama"
          value={form.egitimAciklamasi}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={4}
        />

        <input
          type="number"
          name="fiyat"
          placeholder="Fiyat"
          value={form.fiyat}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="onlineFiyat"
          placeholder="Online Fiyat"
          value={form.onlineFiyat}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="kategori"
          placeholder="Kategori"
          value={form.kategori}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="egitimSuresi"
          placeholder="Süre (saat)"
          value={form.egitimSuresi}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="egitimYeri"
          placeholder="Yer"
          value={form.egitimYeri}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="egitimTakvimid"
          placeholder="Takvim ID"
          value={form.egitimTakvimid}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="egitimProgramid"
          placeholder="Program ID"
          value={form.egitimProgramid}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Eğitimi Kaydet
        </button>
      </form>
    </div>
  );
};

export default EgitimEkle;
