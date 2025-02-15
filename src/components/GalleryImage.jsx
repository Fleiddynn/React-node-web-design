import React from "react";
import { motion } from "framer-motion";

const GalleryImage = ({ selected, data, maxImages }) => {
  const filteredData =
    selected === "all"
      ? data
      : data.filter((item) => item.category === selected);
  const sortedData = filteredData.sort(
    (a, b) => new Date(b.Date) - new Date(a.Date)
  );
  const limitedData = sortedData.slice(0, maxImages);

  return (
    <>
      {limitedData.map((item) => (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
          key={item.id}
          className="relative w-full h-48 overflow-hidden rounded-lg shadow-lg group"
        >
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-70 transition-all duration-300 flex flex-col justify-center items-center text-white text-center p-4">
            <h3 className="text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.title}
            </h3>
            <p className="text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.Date}
            </p>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default GalleryImage;
