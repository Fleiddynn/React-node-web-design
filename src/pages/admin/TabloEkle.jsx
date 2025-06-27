import React, { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const TabloEkle = () => {
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

  const handleChange = (e, programType, field) => {
    setProgramData((prevData) => ({
      ...prevData,
      [programType]: {
        ...prevData[programType],
        [field]: e.target.value,
      },
    }));
  };

  const handleAdd = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/addProgram`,
        programData
      );

      alert(response.data.message);

      setProgramData({
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

      navigate("/admin/tablolar");
    } catch (error) {
      console.error("Veri ekleme hatası:", error);
      if (error.response) {
        alert(
          `Hata: ${
            error.response.data.error ||
            error.response.data.message ||
            "Bilinmeyen bir sunucu hatası oluştu."
          }`
        );
      } else if (error.request) {
        alert(
          "Program eklenirken bir ağ hatası oluştu. Sunucuya ulaşılamıyor."
        );
      } else {
        alert(`Bir hata oluştu: ${error.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 relative">
        <Link
          to="/admin/tablolar"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          <span>Tablo Listesine Geri Dön</span>
        </Link>

        <h1 className="text-2xl font-bold text-gray-800 text-center absolute left-1/2 transform -translate-x-1/2">
          YENİ TABLO EKLE
        </h1>

        <span className="w-[170px]"></span>
      </div>

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
                    placeholder="Tarih seçiniz..."
                    value={programData.haftasonu.tarih}
                    onChange={(e) => handleChange(e, "haftasonu", "tarih")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="date"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Tarih seçiniz..."
                    value={programData.haftaici.tarih}
                    onChange={(e) => handleChange(e, "haftaici", "tarih")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="date"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Tarih seçiniz..."
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
                    placeholder="Günleri giriniz..."
                    value={programData.haftasonu.gunler}
                    onChange={(e) => handleChange(e, "haftasonu", "gunler")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Günleri giriniz..."
                    value={programData.haftaici.gunler}
                    onChange={(e) => handleChange(e, "haftaici", "gunler")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Günleri giriniz..."
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
                    placeholder="Saatleri giriniz..."
                    value={programData.haftasonu.saatler}
                    onChange={(e) => handleChange(e, "haftasonu", "saatler")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Saatleri giriniz..."
                    value={programData.haftaici.saatler}
                    onChange={(e) => handleChange(e, "haftaici", "saatler")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Saatleri giriniz..."
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
                    placeholder="Süreyi giriniz..."
                    value={programData.haftasonu.sure}
                    onChange={(e) => handleChange(e, "haftasonu", "sure")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Süreyi giriniz..."
                    value={programData.haftaici.sure}
                    onChange={(e) => handleChange(e, "haftaici", "sure")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Süreyi giriniz..."
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
                    placeholder="Yeri giriniz..."
                    value={programData.haftasonu.yer}
                    onChange={(e) => handleChange(e, "haftasonu", "yer")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Yeri giriniz..."
                    value={programData.haftaici.yer}
                    onChange={(e) => handleChange(e, "haftaici", "yer")}
                  />
                </td>
                <td className="border-b px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Yeri giriniz..."
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
                    placeholder="Ücreti giriniz..."
                    value={programData.haftasonu.ucret}
                    onChange={(e) => handleChange(e, "haftasonu", "ucret")}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Ücreti giriniz..."
                    value={programData.haftaici.ucret}
                    onChange={(e) => handleChange(e, "haftaici", "ucret")}
                  />
                </td>
                <td className="px-3 py-2">
                  <input
                    type="text"
                    className="w-full p-1.5 border border-gray-300 rounded text-sm"
                    placeholder="Ücreti giriniz..."
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
        onClick={handleAdd}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
      >
        Tabloyu Ekle
      </button>
    </div>
  );
};

export default TabloEkle;
