import { React, useState } from "react";
import galleryData from "./../data/galleryData.json";
import CategoryFilter from "./CategoryFilter.jsx";
import GalleryImage from "./GalleryImage.jsx";

const Gallery = () => {
  const MAX_IMAGES = 6;
  const [selectedCategory, setSelectedCategory] = useState("all");

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

  return (
    <section className="container mx-auto p-4">
      <div className="flex justify-center space-x-4 mb-6">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <GalleryImage
          selected={selectedCategory}
          data={galleryData}
          maxImages={MAX_IMAGES}
        />
      </div>
    </section>
  );
};

export default Gallery;
