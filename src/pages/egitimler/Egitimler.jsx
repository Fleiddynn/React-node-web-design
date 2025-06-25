import React, { useState, useEffect } from "react";
import SingleCourse from "./../../components/SingleCourse.jsx";

function Egitimler() {
  const [egitimler, setEgitimler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    const fetchEgitimler = async () => {
      try {
        const response = await fetch("http://localhost:5000/egitimler");
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum: ${response.status}`);
        }
        const data = await response.json();
        setEgitimler(data);
      } catch (error) {
        console.error("Eğitimler çekilirken hata oluştu:", error);
        setHata(
          "Eğitimleri yüklerken bir sorun oluştu. Lütfen daha sonra tekrar deneyin."
        );
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
        Tüm Eğitimler
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {egitimler.length > 0 ? (
          egitimler.map((egitim) => (
            <SingleCourse
              key={egitim.id}
              id={egitim.id}
              egitimAdi={egitim.egitimAdi}
              resimYolu={egitim.resimYolu}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            Henüz hiç eğitim bulunmuyor.
          </p>
        )}
      </div>
    </div>
  );
}

export default Egitimler;
