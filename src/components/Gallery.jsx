import { useState } from "react";
import galleryData from "./../data/galleryData.json";
import CategoryFilter from "./CategoryFilter.jsx";
import GalleryImage from "./GalleryImage.jsx";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const Gallery = ({
  maxImages = 6,
  showPagination = false,
  animate = false,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredImages =
    selectedCategory === "all"
      ? galleryData
      : galleryData.filter((item) => item.category === selectedCategory);

  const totalPages = Math.ceil(filteredImages.length / maxImages);
  const startIndex = (currentPage - 1) * maxImages;
  const paginatedImages = filteredImages.slice(
    startIndex,
    startIndex + maxImages
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const categories = [
    {
      id: "all",
      name: "Tümü",
    },
    ...Array.from(new Set(galleryData.map((item) => item.category))).map(
      (category) => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
      })
    ),
  ];

  const animationProps = animate
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 },
      };

  return (
    <motion.section
      key={`${selectedCategory}-${currentPage}`}
      {...animationProps}
      className="container mx-auto p-4"
    >
      <div className="flex justify-center space-x-4 mb-6">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={(category) => {
            setSelectedCategory(category);
            setCurrentPage(1);
          }}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <GalleryImage
          selected={selectedCategory}
          data={paginatedImages}
          maxImages={maxImages}
        />
      </div>
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={`px-3 py-2 rounded-md cursor-pointer transition-all duration-200 hover:scale-110
              ${
                currentPage > 1
                  ? "bg-primary hover:bg-primary/80 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed hover:scale-100"
              }`}
          >
            Önceki
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md cursor-pointer transition-all duration-200 hover:scale-110
                ${
                  currentPage === index + 1
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              currentPage < totalPages && handlePageChange(currentPage + 1)
            }
            className={`px-3 py-2 rounded-md cursor-pointer transition-all duration-200 hover:scale-110
              ${
                currentPage < totalPages
                  ? "bg-primary hover:bg-primary/80 text-white"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed hover:scale-100"
              }`}
          >
            Sonraki
          </button>
        </div>
      )}
    </motion.section>
  );
};

Gallery.propTypes = {
  maxImages: PropTypes.number,
  showPagination: PropTypes.bool,
  animate: PropTypes.bool,
};

export default Gallery;
