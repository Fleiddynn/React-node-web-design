import React from "react";

function SingleCourse({ egitimAdi, resimYolu }) {
  const fullImageUrl = `http://localhost:5000/${resimYolu}`;

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
      <img
        src={fullImageUrl}
        alt={egitimAdi}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {egitimAdi}
        </h3>
      </div>
    </div>
  );
}

export default SingleCourse;
