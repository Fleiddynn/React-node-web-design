import React, { useState, useEffect } from "react";
import SingleCourse from "./../../components/SingleCourse.jsx";
import { motion } from "framer-motion";

function Egitimler() {
  const [egitimler, setEgitimler] = useState([]);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    const fetchEgitimler = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/egitimler`
        );
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
        Tüm Eğitimler
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
      >
        {egitimler.length > 0 ? (
          egitimler.map((egitim) => (
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
            Henüz hiç eğitim bulunmuyor.
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Egitimler;
