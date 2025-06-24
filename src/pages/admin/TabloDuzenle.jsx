import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import axios from "axios";

const TabloDuzenle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [programData, setProgramData] = useState({
    haftasonu: {
      tarih: "",
      gunler: "",
      saatler: "",
      sure: "",
      yer: "",
      ucret: "",
    },
    haftaici: {
      tarih: "",
      gunler: "",
      saatler: "",
      sure: "",
      yer: "",
      ucret: "",
    },
    online: {
      tarih: "",
      gunler: "",
      saatler: "",
      sure: "",
      yer: "",
      ucret: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProgramDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/programs/${id}`
        );
        const dbRow = response.data;

        setProgramData({
          haftasonu: {
            tarih: dbRow.haftasonu_tarih || "",
            gunler: dbRow.haftasonu_gunler || "",
            saatler: dbRow.haftasonu_saatler || "",
            sure: dbRow.haftasonu_sure || "",
            yer: dbRow.haftasonu_yer || "",
            ucret: dbRow.haftasonu_ucret || "",
          },
          haftaici: {
            tarih: dbRow.haftaici_tarih || "",
            gunler: dbRow.haftaici_gunler || "",
            saatler: dbRow.haftaici_saatler || "",
            sure: dbRow.haftaici_sure || "",
            yer: dbRow.haftaici_yer || "",
            ucret: dbRow.haftaici_ucret || "",
          },
          online: {
            tarih: dbRow.online_tarih || "",
            gunler: dbRow.online_gunler || "",
            saatler: dbRow.online_saatler || "",
            sure: dbRow.online_sure || "",
            yer: dbRow.online_yer || "",
            ucret: dbRow.online_ucret || "",
          },
        });
      } catch (err) {
        console.error("Program detayları çekilirken hata oluştu:", err);
        if (err.response) {
          setError(
            `Sunucu Hatası: ${err.response.status} - ${
              err.response.data.error || err.response.data.message
            }`
          );
        } else if (err.request) {
          setError("Ağ Hatası: Sunucuya ulaşılamıyor.");
        } else {
          setError(`Bilinmeyen Hata: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProgramDetails();
  }, [id]);

  const handleChange = (e, programType, field) => {
    setProgramData((prevData) => ({
      ...prevData,
      [programType]: {
        ...prevData[programType],
        [field]: e.target.value,
      },
    }));
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/programs/${id}`,
        programData
      );

      alert(response.data.message);
      navigate("/admin/tablolar");
    } catch (error) {
      console.error("Program güncellenirken hata oluştu:", error);
      if (error.response) {
        alert(
          `Güncelleme Hatası: ${
            error.response.data.error ||
            error.response.data.message ||
            "Bilinmeyen bir sunucu hatası oluştu."
          }`
        );
      } else if (error.request) {
        alert(
          "Program güncellenirken bir ağ hatası oluştu. Sunucuya ulaşılamıyor."
        );
      } else {
        alert(`Bir hata oluştu: ${error.message}`);
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg mt-8">
        Tablo detayları yükleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg mt-8 text-red-600">Hata: {error}</div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link
          to="/admin/tablolar"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          <span>Tablo Listesine Geri Dön</span>
        </Link>
      </div>

      <h1 className="text-2xl font-bold text-center text-head mb-6">
        TABLOYU DÜZENLE (ID: {id})
      </h1>

      <div className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse bg-white text-sm">
            <thead>
              <tr className="text-white">
                <th className="py-2 px-3 bg-orange-500 rounded-tl-lg"></th>
                <th className="py-2 px-3 bg-orange-500 text-center">
                  HAFTASONU PROGRAMI
                </th>
                <th className="py-2 px-3 bg-orange-500 text-center">
                  HAFTAİÇİ PROGRAMI
                </th>
                <th className="py-2 px-3 bg-orange-500 rounded-tr-lg text-center">
                  ONLINE PROGRAM
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b px-3 py-2 font-semibold text-gray-700">
                  Tarih
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="date"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftasonu.tarih}
                    onChange={(e) => handleChange(e, "haftasonu", "tarih")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="date"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftaici.tarih}
                    onChange={(e) => handleChange(e, "haftaici", "tarih")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="date"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.online.tarih}
                    onChange={(e) => handleChange(e, "online", "tarih")}
                  />
                </td>
              </tr>
              <tr>
                <td className="border-b px-3 py-2 font-semibold text-gray-700">
                  Günler
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftasonu.gunler}
                    onChange={(e) => handleChange(e, "haftasonu", "gunler")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftaici.gunler}
                    onChange={(e) => handleChange(e, "haftaici", "gunler")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.online.gunler}
                    onChange={(e) => handleChange(e, "online", "gunler")}
                  />
                </td>
              </tr>
              <tr>
                <td className="border-b px-3 py-2 font-semibold text-gray-700">
                  Saatler
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftasonu.saatler}
                    onChange={(e) => handleChange(e, "haftasonu", "saatler")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftaici.saatler}
                    onChange={(e) => handleChange(e, "haftaici", "saatler")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.online.saatler}
                    onChange={(e) => handleChange(e, "online", "saatler")}
                  />
                </td>
              </tr>
              <tr>
                <td className="border-b px-3 py-2 font-semibold text-gray-700">
                  Süre
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftasonu.sure}
                    onChange={(e) => handleChange(e, "haftasonu", "sure")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftaici.sure}
                    onChange={(e) => handleChange(e, "haftaici", "sure")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.online.sure}
                    onChange={(e) => handleChange(e, "online", "sure")}
                  />
                </td>
              </tr>
              <tr>
                <td className="border-b px-3 py-2 font-semibold text-gray-700">
                  Yer
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftasonu.yer}
                    onChange={(e) => handleChange(e, "haftasonu", "yer")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftaici.yer}
                    onChange={(e) => handleChange(e, "haftaici", "yer")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.online.yer}
                    onChange={(e) => handleChange(e, "online", "yer")}
                  />
                </td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-semibold text-gray-700">Ücret</td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftasonu.ucret}
                    onChange={(e) => handleChange(e, "haftasonu", "ucret")}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.haftaici.ucret}
                    onChange={(e) => handleChange(e, "haftaici", "ucret")}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    value={programData.online.ucret}
                    onChange={(e) => handleChange(e, "online", "ucret")}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <button
        onClick={handleUpdate}
        className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
      >
        Tabloyu Güncelle
      </button>
    </div>
  );
};

export default TabloDuzenle;
