import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleCourse from "./../../components/SingleCourse.jsx";
import { motion } from "framer-motion";

const GumrukEgitimleri = () => {
  const [Egitimler, setEgitimler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  const aranacakKategoriler = ["Gümrük Eğitimleri"];

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

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

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
    <motion.div
      className="container mx-auto p-4 md:p-8"
      initial="hidden"
      animate="show"
      variants={containerVariants}
    >
      <motion.h1
        className="text-4xl font-extrabold text-center text-gray-800 mb-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Gümrük Eğitimleri
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {Egitimler.length > 0 ? (
          Egitimler.map((egitim) => (
            <motion.div key={egitim.id} variants={itemVariants}>
              <SingleCourse
                id={egitim.id}
                egitimAdi={egitim.egitimAdi}
                resimYolu={egitim.resimYolu}
              />
            </motion.div>
          ))
        ) : (
          <motion.p
            className="col-span-full text-center text-gray-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Kategoriye ait eğitim bulunmuyor.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default GumrukEgitimleri;
