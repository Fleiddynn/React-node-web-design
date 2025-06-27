import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryFilter from "./CategoryFilter.jsx";
import GalleryImage from "./GalleryImage.jsx";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  ComputerDesktopIcon,
  BuildingOfficeIcon,
  BuildingLibraryIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";

const Gallery = ({
  maxImages = 6,
  showPagination = false,
  animate = false,
}) => {
  const [mezunlar, setMezunlar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMezunlar = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/mezunlarimiz`
        );
        setMezunlar(response.data);
      } catch (err) {
        console.error("Mezunlar verisi çekilirken hata oluştu:", err);
        setError("Mezunlar verileri yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchMezunlar();
  }, []);

  const filteredImages =
    selectedCategory === "all"
      ? mezunlar
      : mezunlar.filter((item) => item.kategori === selectedCategory);

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
      icon: <BookmarkIcon className="w-5 h-5" />,
      color: "bg-gray-100",
    },
    ...Array.from(new Set(mezunlar.map((item) => item.kategori)))
      .filter(Boolean)
      .map((category) => {
        let iconComponent = <BookmarkIcon className="w-5 h-5" />;
        let categoryColor = "bg-gray-100";

        switch (category) {
          case "Sınıf Eğitimi Mezunlarımız":
            iconComponent = <AcademicCapIcon className="w-5 h-5" />;
            break;
          case "Online Eğitim Mezunlarımız":
            iconComponent = <ComputerDesktopIcon className="w-5 h-5" />;
            break;
          case "Kurumsal Şirket Eğitimleri":
            iconComponent = <BuildingOfficeIcon className="w-5 h-5" />;
            break;
          case "Resmi Kurum Eğitimleri":
            iconComponent = <BuildingLibraryIcon className="w-5 h-5" />;
            break;
          default:
            iconComponent = <BookmarkIcon className="w-5 h-5" />;
        }

        return {
          id: category,
          name: category,
          icon: iconComponent,
          color: categoryColor,
        };
      }),
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-orange-500"></div>
        <p className="ml-4 text-lg text-gray-700">Mezunlar yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>;
  }

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
        {paginatedImages.length > 0 ? (
          <GalleryImage data={paginatedImages} />
        ) : (
          <div className="col-span-full text-center text-gray-500">
            Seçili kategoriye ait mezun bulunmamaktadır.
          </div>
        )}
      </div>
      {showPagination && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            className={`px-3 py-2 rounded-md cursor-pointer transition-all duration-200 hover:scale-110
              ${
                currentPage > 1
                  ? "bg-orange-600 hover:bg-orange-700 text-white"
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
                    ? "bg-orange-600 text-white"
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
                  ? "bg-orange-600 hover:bg-orange-700 text-white"
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
