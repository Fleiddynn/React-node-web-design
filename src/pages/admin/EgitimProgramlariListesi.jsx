import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  PencilSquareIcon,
  TrashIcon,
  PlusCircleIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";

const EgitimProgramlariListesi = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/egitim-programlari`
      );
      setPrograms(response.data);
      setError(null);
    } catch (err) {
      console.error("Eğitim programı yapıları yüklenirken hata:", err);
      setError("Eğitim programı yapıları yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleDelete = (id, program_name) => {
    confirmAlert({
      title: "Eğitim Programı Yapısını Sil",
      message: `${program_name} adlı eğitim programı yapısını silmek istediğinizden emin misiniz? Bu işlem, bu program yapısını kullanan tüm eğitimleri etkileyebilir.`,
      buttons: [
        {
          label: "Evet",
          onClick: async () => {
            try {
              await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/egitim-programlari/${id}`
              );
              alert("Eğitim programı yapısı başarıyla silindi!");
              fetchPrograms();
            } catch (err) {
              console.error("Eğitim programı yapısı silinirken hata:", err);
              alert(
                `Eğitim programı yapısı silinirken hata oluştu: ${
                  err.response?.data?.error || err.message
                }`
              );
            }
          },
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

  if (loading) return <div className="text-center p-4">Yükleniyor...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="mb-6">
        <Link
          to="/admin"
          className="inline-flex items-center px-4 py-2 text-secondary hover:text-primary-darker transition-colors duration-200 font-medium rounded-lg hover:bg-gray-100"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span>Admin Paneline Geri Dön</span>
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Eğitim Programı Yapıları Yönetimi
      </h1>

      <div className="flex justify-end mb-4">
        <Link
          to="/admin/egitim-programlari/ekle"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Yeni Program Yapısı Ekle
        </Link>
      </div>

      {programs.length === 0 ? (
        <p className="text-center text-gray-600">
          Henüz hiç eğitim programı yapısı bulunmamaktadır.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Adı
                </th>
                <th className="py-3 px-6 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {programs.map((program) => (
                <tr
                  key={program.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">
                    {program.id}
                  </td>
                  <td className="py-4 px-6 text-sm text-gray-700 max-w-xs truncate">
                    {program.program_name}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      to={`/admin/egitim-programlari/duzenle/${program.id}`}
                      className="text-indigo-600 hover:text-indigo-900 mr-3"
                    >
                      <PencilSquareIcon className="h-5 w-5 inline" /> Düzenle
                    </Link>
                    <button
                      onClick={() =>
                        handleDelete(program.id, program.program_name)
                      }
                      className="text-red-600 hover:text-red-900"
                    >
                      <TrashIcon className="h-5 w-5 inline" /> Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default EgitimProgramlariListesi;
