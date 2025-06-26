import { motion } from "framer-motion";
import PropTypes from "prop-types";

const GalleryImage = ({ data }) => {
  return (
    <>
      {Array.isArray(data) &&
        data.map((item) => (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            viewport={{ once: true }}
            key={item.id}
            className="relative w-full h-48 sm:h-56 overflow-hidden rounded-lg shadow-lg group"
          >
            <img
              src={`http://localhost:5000/${item.resimYolu}`}
              alt={item.baslik}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/320x160/cccccc/333333?text=Resim+Y\u00FCklenemedi";
              }}
            />

            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-all duration-300 flex flex-col justify-center items-center text-white text-center p-4">
              <h3 className="text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.baslik}
              </h3>
              <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.kategori}
              </p>
              <p className="text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {new Date(item.olusturmaTarihi).toLocaleDateString("tr-TR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </motion.div>
        ))}
    </>
  );
};

GalleryImage.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      resimYolu: PropTypes.string,
      baslik: PropTypes.string.isRequired,
      olusturmaTarihi: PropTypes.string.isRequired,
      kategori: PropTypes.string,
    })
  ).isRequired,
};

export default GalleryImage;
