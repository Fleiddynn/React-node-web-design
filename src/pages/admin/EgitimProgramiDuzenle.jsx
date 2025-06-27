import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import EgitimProgramiForm from "./EgitimProgramiForm.jsx";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
axios.defaults.withCredentials = true;

const EgitimProgramiDuzenle = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/egitim-programlari/${id}`
        );
        setInitialData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Eğitim programı yapısı yüklenirken hata:", err);
        setError("Eğitim programı yapısı yüklenirken bir hata oluştu.");
        setLoading(false);
      }
    };
    fetchProgram();
  }, [id]);

  const handleSubmit = async (formData) => {
    setSaving(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/egitim-programlari/${id}`,
        formData
      );
      alert("Eğitim programı yapısı başarıyla güncellendi!");
      navigate("/admin/egitim-programlari");
    } catch (err) {
      console.error("Eğitim programı yapısı güncellenirken hata:", err);
      alert(
        `Eğitim programı yapısı güncellenirken bir hata oluştu: ${
          err.response?.data?.error || err.message
        }`
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center p-4">Yükleniyor...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (!initialData)
    return <div className="text-center p-4">Veri bulunamadı.</div>;

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
        Eğitim Programı Yapısını Düzenle (ID: {id})
      </h1>
      <EgitimProgramiForm
        initialData={initialData}
        onSubmit={handleSubmit}
        isEditing={true}
        saving={saving}
      />
    </div>
  );
};

export default EgitimProgramiDuzenle;
