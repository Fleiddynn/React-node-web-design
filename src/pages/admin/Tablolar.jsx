import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseCalendar from "../../components/CourseCalendar";
import {
  ArrowLeftIcon,
  PlusCircleIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const Tablolar = () => {
  const navigate = useNavigate();

  const [programList, setProgramList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrograms = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/programs");
      const data = response.data;

      console.log("Fetched programs:", data);

      const transformedData = data.map((dbRow) => {
        return {
          id: dbRow.id,
          programs: [
            {
              type: "HAFTASONU PROGRAMI",
              date: dbRow.haftasonu_tarih,
              days: dbRow.haftasonu_gunler,
              hours: dbRow.haftasonu_saatler,
              duration: dbRow.haftasonu_sure,
              location: dbRow.haftasonu_yer,
              price: dbRow.haftasonu_ucret,
            },
            {
              type: "HAFTAİÇİ PROGRAMI",
              date: dbRow.haftaici_tarih,
              days: dbRow.haftaici_gunler,
              hours: dbRow.haftaici_saatler,
              duration: dbRow.haftaici_sure,
              location: dbRow.haftaici_yer,
              price: dbRow.haftaici_ucret,
            },
            {
              type: "ONLINE PROGRAM",
              date: dbRow.online_tarih,
              days: dbRow.online_gunler,
              hours: dbRow.online_saatler,
              duration: dbRow.online_sure,
              location: dbRow.online_yer,
              price: dbRow.online_ucret,
            },
          ],
        };
      });
      setProgramList(transformedData);
      setError(null);
    } catch (err) {
      console.error("Tablolar çekilirken hata oluştu:", err);
      if (err.response) {
        setError(
          `Sunucu Hatası: ${err.response.status} - ${
            err.response.data.error ||
            err.response.data.message ||
            "Bilinmeyen Hata"
          }`
        );
      } else if (err.request) {
        setError(
          "Ağ Hatası: Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin."
        );
      } else {
        setError(`Bilinmeyen Hata: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleEdit = (programId) => {
    navigate(`/admin/tablo-duzenle/${programId}`);
  };

  const handleDelete = (programId) => {
    confirmAlert({
      title: "Tabloyu Sil",
      message: `ID ${programId} olan tabloyu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.`,
      buttons: [
        {
          label: "Evet",
          onClick: async () => {
            try {
              const response = await axios.delete(
                `http://localhost:5000/api/programs/${programId}`
              );
              alert(response.data.message || "Tablo başarıyla silindi!");
              fetchPrograms();
            } catch (err) {
              console.error("Silme işlemi sırasında hata:", err);
              if (err.response) {
                alert(
                  `Silme hatası: ${
                    err.response.data.error ||
                    err.response.data.message ||
                    "Bilinmeyen hata"
                  }`
                );
              } else if (err.request) {
                alert(
                  "Silme işlemi sırasında ağ hatası. Sunucuya ulaşılamıyor."
                );
              } else {
                alert(`Bir hata oluştu: ${err.message}`);
              }
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

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg min-h-screen">
      <div className="relative flex items-center justify-between mb-6">
        <Link
          to="/admin"
          className="inline-flex items-center text-secondary hover:text-blue-800 transition-colors duration-200 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 z-10"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Admin Paneline Geri Dön
        </Link>

        <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-gray-800 text-center">
          MEVCUT TABLOLARIN YÖNETİMİ
        </h1>

        <Link
          to="/admin/tablo-ekle"
          className="inline-flex items-center px-4 py-2 bg-secondary text-white rounded-md hover:bg-blue-700 transition-colors duration-200 z-10"
        >
          <PlusCircleIcon className="h-5 w-5 mr-2" />
          Yeni Tablo Ekle
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-xl text-gray-600">Tablolar yükleniyor...</p>
        </div>
      ) : error ? (
        <div className="text-center text-xl mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p>Hata: {error}</p>
          <p className="text-sm mt-2">
            Lütfen sunucunuzun çalıştığından ve doğru verileri döndürdüğünden
            emin olun.
          </p>
        </div>
      ) : programList.length === 0 ? (
        <div className="text-center text-xl mt-8 p-4 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
          <p>Henüz hiç tablo eklenmemiş.</p>
          <p className="text-base mt-2">
            Lütfen yukarıdaki "Yeni Tablo Ekle" butonunu kullanarak bir tablo
            ekleyin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programList.map((programEntry) => (
            <div
              key={programEntry.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
                Tablo ID: {programEntry.id}
              </h2>
              <CourseCalendar programEntry={programEntry} />
              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => handleEdit(programEntry.id)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors duration-200 shadow cursor-pointer"
                >
                  <PencilSquareIcon className="h-5 w-5 mr-2" /> Düzenle
                </button>
                <button
                  onClick={() => handleDelete(programEntry.id)}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors duration-200 shadow cursor-pointer"
                >
                  <TrashIcon className="h-5 w-5 mr-2" /> Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tablolar;
