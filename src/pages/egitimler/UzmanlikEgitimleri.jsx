import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleCourse from "./../../components/SingleCourse.jsx";

const UzmanlikEgitimleri = () => {
  const [Egitimler, setEgitimler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  const aranacakKategoriler = ["Uzmanlık Eğitimleri"];

  useEffect(() => {
    const fetchEgitimler = async () => {
      try {
        const response = await axios.get("http://localhost:5000/egitimler");
        const data = response.data;

        const filtrelenmisData = data.filter((egitim) => {
          const kategoriString = egitim.kategori || "";

          if (
            typeof kategoriString !== "string" ||
            kategoriString.trim() === ""
          ) {
            console.warn(
              `UYARI: ${egitim.id} ID'li eğitimin 'kategori' alanı geçersiz (boş veya string değil):`,
              kategoriString,
              egitim
            );
            return false;
          }

          const egitimKategorileri = kategoriString
            .split(",")
            .map((kategori) => kategori.trim())
            .filter((kategori) => kategori !== "");

          return (
            egitimKategorileri.length > 0 &&
            aranacakKategoriler.some((arananKategori) =>
              egitimKategorileri.includes(arananKategori)
            )
          );
        });

        setEgitimler(filtrelenmisData);
      } catch (error) {
        console.error("Eğitimler çekilirken hata oluştu:", error);
        if (axios.isAxiosError(error)) {
          setHata(
            `Eğitimleri yüklerken bir sorun oluştu: ${
              error.response ? error.response.status : error.message
            }. Lütfen sunucunun çalıştığından ve verilerin doğru geldiğinden emin olun.`
          );
        } else {
          setHata(
            "Eğitimleri yüklerken bir sorun oluştu. Lütfen daha sonra tekrar deneyin."
          );
        }
      } finally {
        setYukleniyor(false);
      }
    };

    fetchEgitimler();
  }, []);

  if (yukleniyor) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-gray-700">
        Eğitimler yükleniyor...
      </div>
    );
  }

  if (hata) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        {hata}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10">
        Güncel Eğitimler
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Egitimler.length > 0 ? (
          Egitimler.map((egitim) => (
            <SingleCourse
              key={egitim.id}
              egitimAdi={egitim.egitimAdi}
              resimYolu={egitim.resimYolu}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            Kategoriye ait eğitim bulunmuyor.
          </p>
        )}
      </div>
    </div>
  );
};

export default UzmanlikEgitimleri;
