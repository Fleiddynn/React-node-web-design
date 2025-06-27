import React from "react";
import { Link } from "react-router-dom";

function SingleCourse({ egitimAdi, resimYolu, id }) {
  const imageUrl =
    resimYolu && resimYolu.startsWith("uploads/")
      ? `${import.meta.env.VITE_API_URL}/${resimYolu}`
      : "https://placehold.co/500x400";

  return (
    <Link to={`/egitimler/${id}`} className="block">
      {" "}
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        <img
          src={imageUrl}
          alt={egitimAdi}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/500x400";
            console.error(`Resim yüklenemedi: ${resimYolu}`);
          }}
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {egitimAdi}
          </h3>
        </div>
      </div>
    </Link>
  );
}

export default SingleCourse;
