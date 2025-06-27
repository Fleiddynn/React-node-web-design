import { useState, useEffect } from "react";
import { ClockIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const CoursePageHero = ({
  egitimAdi,
  egitimAciklamasi,
  resimYolu,
  fiyat,
  onlineFiyat,
  egitimSuresi,
  egitimYeri,
  kategori,
}) => {
  const [courseType, setCourseType] = useState("facetoface");

  const currentPrice =
    courseType === "facetoface" ? fiyat || 0 : onlineFiyat || 0;
  const currentLocation =
    courseType === "facetoface" ? egitimYeri || "Belirtilmemiş Yer" : "Online";

  const imageUrl =
    resimYolu && resimYolu.startsWith("uploads/")
      ? `${import.meta.env.VITE_API_URL}/${resimYolu}`
      : "https://placehold.co/500x400";

  useEffect(() => {
    if (onlineFiyat && onlineFiyat > 0 && (!fiyat || fiyat === 0)) {
      setCourseType("online");
    } else if (fiyat && fiyat > 0 && (!onlineFiyat || onlineFiyat === 0)) {
      setCourseType("facetoface");
    }
  }, [fiyat, onlineFiyat]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold text-head mb-4">
              {egitimAdi || "Eğitim Adı Bulunamadı"}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {egitimAciklamasi || "Eğitim açıklaması bulunamadı."}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl overflow-hidden bg-gray-100 aspect-video shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={imageUrl}
              alt={egitimAdi || "Kurs Görseli"}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = placeholderImage;
                console.error(`Resim yüklenemedi: ${resimYolu}`);
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 bg-card p-6 rounded-xl shadow-lg"
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-primary">
                {currentPrice.toLocaleString("tr-TR", {
                  style: "currency",
                  currency: "TRY",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>

            <div>
              <select
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-white cursor-pointer"
              >
                {fiyat !== null && fiyat !== 0 && (
                  <option value="facetoface">Yüz yüze</option>
                )}
                {onlineFiyat !== null && onlineFiyat !== 0 && (
                  <option value="online">Online</option>
                )}
                {(fiyat === null || fiyat === 0) &&
                  (onlineFiyat === null || onlineFiyat === 0) && (
                    <option value="">Fiyat Belirlenmedi</option>
                  )}
              </select>
            </div>

            <button className="w-full bg-secondary text-white py-3 px-4 rounded-md hover:bg-secondary/80 transition-colors cursor-pointer shadow-md hover:shadow-lg">
              Hemen Kayıt Ol
            </button>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-4 border-t border-gray-200 pt-6"
          >
            <div className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
              <ClockIcon className="w-5 h-5" />
              <span>
                Süre: {egitimSuresi ? `${egitimSuresi} saat` : "Belirtilmemiş"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
              <MapPinIcon className="w-5 h-5" />
              <span>{currentLocation}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
              <UserIcon className="w-5 h-5" />
              <span>Kategori: {kategori || "Belirtilmemiş"}</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="border-t border-gray-200 pt-6"
          >
            <h2 className="text-lg font-medium text-head mb-4">
              Kurs Öğretmeni
            </h2>
            <div className="flex items-center gap-4">
              <img
                src="https://placehold.co/64x64"
                alt="Teacher"
                className="w-16 h-16 rounded-full border-2 border-primary"
              />
              <div>
                <h3 className="font-medium text-primary">Recep Heptaş</h3>{" "}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CoursePageHero;
