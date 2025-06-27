import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import EgitimProgramiForm from "./EgitimProgramiForm.jsx";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
axios.defaults.withCredentials = true;

const EgitimProgramiEkle = () => {
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      await axios.post(
        "http://localhost:5000/api/egitim-programlari",
        formData
      );
      alert("Eğitim programı yapısı başarıyla eklendi!");
      navigate("/admin/egitim-programlari");
    } catch (err) {
      console.error("Eğitim programı yapısı eklenirken hata:", err);
      alert(
        `Eğitim programı yapısı eklenirken bir hata oluştu: ${
          err.response?.data?.error || err.message
        }`
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <Link
          to="/admin/egitim-programlari"
          className="inline-flex items-center px-4 py-2 text-secondary hover:text-secondary-darker transition-colors duration-200 font-medium rounded-lg hover:bg-gray-100"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span>Eğitim Programları Listesine Geri Dön</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Yeni Eğitim Programı Yapısı Ekle
      </h1>
      <EgitimProgramiForm onSubmit={handleSubmit} saving={saving} />
    </div>
  );
};

export default EgitimProgramiEkle;
