import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CourseCard({ course }) {
  const displayCategory = course.kategori
    ? course.kategori.split(",")[0].trim()
    : "Genel";

  const imageUrl = course.resimYolu
    ? `http://localhost:5000/${course.resimYolu}`
    : "https://via.placeholder.com/320x160?text=Egitim+Resmi";

  return (
    <Link to={`/egitimler/${course.id}`} className="block">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
        className="group bg-white rounded-2xl shadow-xl shadow-gray-300/50 overflow-hidden hover:scale-105 transition ease-in-out duration-300 delay-25 h-80 w-80 cursor-pointer"
      >
        <div className="h-40 bg-gray-200 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={course.egitimAdi || "Eğitim Resmi"}
            loading="lazy"
            className="w-full h-40 object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/320x160/cccccc/333333?text=Resim+Y\u00FCklenemedi";
            }}
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold text-head group-hover:text-primary transition ease-in-out duration-300 delay-25">
            {course.egitimAdi || "Başlık Yok"}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2">
            {course.egitimAciklamasi || "Açıklama mevcut değil."}{" "}
          </p>
          <div className="mt-4 flex items-center gap-2 text-sm">
            {course.egitimSuresi && (
              <span className="px-2 py-1 bg-gray-100 text-secondary rounded-md">
                {course.egitimSuresi}
              </span>
            )}
            <span className="px-2 py-1 bg-gray-100 text-secondary rounded-md capitalize">
              {displayCategory}
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    resimYolu: PropTypes.string,
    egitimAdi: PropTypes.string.isRequired,
    egitimAciklamasi: PropTypes.string,
    kategori: PropTypes.string,
    egitimSuresi: PropTypes.string,
    fiyat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onlineFiyat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    egitimTarihi: PropTypes.string,
    egitimTakvimi: PropTypes.string,
    egitimProgrami: PropTypes.string,
  }).isRequired,
};
