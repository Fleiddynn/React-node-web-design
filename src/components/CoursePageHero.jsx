import { useState } from "react";
import { ClockIcon, MapPinIcon, UserIcon } from "@heroicons/react/24/outline";

const CourseHero = () => {
  const [courseType, setCourseType] = useState("facetoface");

  const prices = {
    online: 7500,
    facetoface: 15000,
  };

  const locations = {
    online: "Online",
    facetoface: "Mecidiye, İstanbul",
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left Column - Title, Description, and Image */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-head mb-4">
              İstanbul Uygulamalı Uzmanlık Eğitimi
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat
              fugiat eaque error, ipsam aut deserunt consequatur amet
              temporibus, debitis cum, iure deleniti ad ducimus autem magnam
              blanditiis quasi ipsa quis!
            </p>
          </div>

          <div className="rounded-2xl overflow-hidden bg-gray-100 aspect-video shadow-lg hover:shadow-xl transition-shadow duration-300">
            <img
              src="https://placehold.co/800x600"
              alt="Kurs Görseli"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column - Course Details */}
        <div className="space-y-6 bg-card p-6 rounded-xl shadow-lg">
          {/* Price and Type Selection */}
          <div className="space-y-4">
            <div className="flex items-baseline">
              <span className="text-4xl font-bold text-primary">
                {prices[courseType].toLocaleString()}TL
              </span>
            </div>

            <div>
              <select
                value={courseType}
                onChange={(e) => setCourseType(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary bg-white cursor-pointer"
              >
                <option value="facetoface">Yüz yüze</option>
                <option value="online">Online</option>
              </select>
            </div>

            <button className="w-full bg-secondary text-white py-3 px-4 rounded-md hover:bg-secondary/80 transition-colors cursor-pointer shadow-md hover:shadow-lg">
              Hemen Kayıt Ol
            </button>
          </div>

          {/* Course Details */}
          <div className="space-y-4 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
              <ClockIcon className="w-5 h-5" />
              <span>Süre: 5 saat </span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
              <MapPinIcon className="w-5 h-5" />
              <span>{locations[courseType]}</span>
            </div>

            <div className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
              <UserIcon className="w-5 h-5" />
              <span>Kategori: Uzmanlık Eğitimleri</span>
            </div>
          </div>

          {/* Instructor */}
          <div className="border-t border-gray-200 pt-6">
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
                <h3 className="font-medium text-primary">Recep Heptaş</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHero;
