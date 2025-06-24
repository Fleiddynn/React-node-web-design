import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import CourseCalendar from "../../components/CourseCalendar";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const Tablolar = () => {
  const navigate = useNavigate();

  const [programList, setProgramList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrograms = async () => {
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
    } catch (error) {
      console.error("Tablolar çekilirken hata oluştu:", error);
      if (error.response) {
        setError(
          `Sunucu Hatası: ${error.response.status} - ${
            error.response.data.error || error.response.data.message
          }`
        );
      } else if (error.request) {
        setError("Ağ Hatası: Sunucuya ulaşılamıyor.");
      } else {
        setError(`Bilinmeyen Hata: ${error.message}`);
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

  const handleDelete = async (programId) => {
    if (
      window.confirm(
        `ID ${programId} olan tabloyu silmek istediğinize emin misiniz?`
      )
    ) {
      try {
        const response = await axios.delete(
          `http://localhost:5000/api/programs/${programId}`
        );

        alert(response.data.message);
        setProgramList((prevList) =>
          prevList.filter((program) => program.id !== programId)
        );
      } catch (error) {
        console.error("Silme işlemi sırasında hata:", error);
        if (error.response) {
          alert(
            `Silme hatası: ${
              error.response.data.error || error.response.data.message
            }`
          );
        } else if (error.request) {
          alert("Silme işlemi sırasında ağ hatası. Sunucuya ulaşılamıyor.");
        } else {
          alert(`Bir hata oluştu: ${error.message}`);
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg mt-8">Tablolar yükleniyor...</div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg mt-8 text-red-600">Hata: {error}</div>
    );
  }

  if (programList.length === 0) {
    return (
      <div className="text-center text-lg mt-8">Henüz tablo eklenmemiş.</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <div className="absolute top-4 left-4">
        <Link
          to="/admin"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          <span>Admin Paneline Geri Dön</span>
        </Link>
      </div>

      <div className="w-full max-w-5xl mx-auto mb-6 mt-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          MEVCUT TABLOLARIN YÖNETİMİ
        </h1>
        <Link
          to="/admin/tablo-ekle"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Yeni Tablo Ekle
        </Link>
      </div>

      {programList.map((programEntry) => (
        <div key={programEntry.id} className="w-full max-w-5xl mx-auto mb-6">
          <CourseCalendar programEntry={programEntry} />
          <div className="flex justify-center mt-4 mb-8">
            <button
              onClick={() => handleEdit(programEntry.id)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Düzenle
            </button>
            <button
              onClick={() => handleDelete(programEntry.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Sil
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tablolar;
