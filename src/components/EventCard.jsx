import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const EventCard = ({ course }) => {
  const imageUrl = course.resimYolu
    ? `http://localhost:5000/${course.resimYolu}`
    : `https://placehold.co/200x100/cccccc/333333?text=Resim+Yok`;
  const formatDate = (isoString) => {
    if (!isoString) return "Tarih Belirtilmemiş";
    const date = new Date(isoString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link to={`/egitimler/${course.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="space-y-4 cursor-pointer group hover:scale-105 transition ease-in-out duration-300 delay-25 mb-5"
      >
        <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition ease-in-out duration-300 delay-25">
          <div className="flex items-center mb-3">
            <img
              src={imageUrl}
              alt={course.egitimAdi || "Eğitim Resmi"}
              className="rounded-lg mr-4 w-24 h-24 object-cover flex-shrink-0"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/100x100/cccccc/333333?text=Resim+Yok";
              }}
            />
            <div className="flex-1">
              <h3 className="font-semibold text-head group-hover:text-primary text-lg mb-1">
                {course.egitimAdi || "Eğitim Adı Belirtilmemiş"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {course.egitimYeri || "Yer Belirtilmemiş"} •{" "}
                {formatDate(course.closestDate)}
              </p>
            </div>
            <ArrowLongRightIcon className="text-secondary group-hover:scale-120 h-5 w-5 transition ease-in-out duration-300 delay-25 ml-4" />
          </div>
          {course.egitimAciklamasi && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {course.egitimAciklamasi}
            </p>
          )}
        </div>
      </motion.div>
    </Link>
  );
};

EventCard.propTypes = {
  course: PropTypes.shape({
    id: PropTypes.number.isRequired,
    egitimAdi: PropTypes.string,
    egitimAciklamasi: PropTypes.string,
    resimYolu: PropTypes.string,
    egitimYeri: PropTypes.string,
    closestDate: PropTypes.string,
  }).isRequired,
};

export default EventCard;
