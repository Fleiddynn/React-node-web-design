import { useState, useEffect } from "react";
import CategoryFilter from "./CategoryFilter";
import CourseList from "./CourseList";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios"; // Axios'u import edin

import {
  BookmarkIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  MegaphoneIcon,
  GlobeAltIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  RocketLaunchIcon,
  TruckIcon,
  ScaleIcon,
  LightBulbIcon,
  UserGroupIcon,
  ChartBarIcon,
} from "@heroicons/react/24/solid";

const categoryIcons = {
  all: <BookmarkIcon className="w-5 h-5" />,
  "Uzmanlık Eğitimleri": <PaintBrushIcon className="w-5 h-5" />,
  "Lojistik Eğitimleri": <TruckIcon className="w-5 h-5" />,
  "Gümrük Eğitimleri": <ScaleIcon className="w-5 h-5" />,
  "Şehir Eğitimleri": <BuildingOfficeIcon className="w-5 h-5" />,
  "Sektörel Eğitimler": <BriefcaseIcon className="w-5 h-5" />,
  "Yetkinlik Eğitimleri": <AcademicCapIcon className="w-5 h-5" />,
  "Güncel Eğitimler": <GlobeAltIcon className="w-5 h-5" />,
  "Uzmanlık Eğitimi": <PaintBrushIcon className="w-5 h-5" />,
  "Gümrük Eğitimi": <ScaleIcon className="w-5 h-5" />,
};

const PopularCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/egitimler");
        const data = response.data;
        setCourses(data);
      } catch (e) {
        console.error("Eğitim verileri çekilirken hata:", e);
        if (axios.isAxiosError(e)) {
          setError(
            "Eğitimler yüklenirken bir hata oluştu: " +
              (e.response ? e.response.status : e.message)
          );
        } else {
          setError(
            "Eğitimler yüklenirken beklenmeyen bir hata oluştu: " + e.message
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const categories = [
    {
      id: "all",
      name: "Tümü",
      icon: categoryIcons.all,
    },
    ...Array.from(
      new Set(
        courses.flatMap((course) =>
          course.kategori
            ? course.kategori.split(",").map((cat) => cat.trim())
            : []
        )
      )
    ).map((category) => ({
      id: category,
      name: category,
      icon: categoryIcons[category] || <BookmarkIcon className="w-5 h-5" />,
    })),
  ];

  if (loading) {
    return (
      <section className="flex flex-col justify-center items-center mb-5 min-h-screen">
        <p className="text-xl text-primary">Eğitimler yükleniyor...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col justify-center items-center mb-5 min-h-screen">
        <p className="text-xl text-red-500">{error}</p>
        <p className="text-gray-600">
          Lütfen daha sonra tekrar deneyin veya yöneticinizle iletişime geçin.
        </p>
      </section>
    );
  }

  return (
    <section className="flex flex-col justify-center items-center mb-5">
      <motion.h2
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-primary text-xl mb-5 font-semibold"
      >
        Eğitimlerimiz
      </motion.h2>
      <motion.h1
        initial={{ opacity: 0, y: -25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="text-3xl font-medium text-head mb-3"
      >
        Popüler Eğitimlerimize Göz Atın
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="font-light text-zinc-500 max-w-200 mb-8 text-center"
      >
        Paragraf yazısı lorem ipsum dolar sit amet Paragraf yazısı lorem ipsum
        dolar sit amet Paragraf yazısı lorem ipsum dolar sit amet Paragraf
        yazısı lorem ipsum dolar sit amet Paragraf yazısı lorem ipsum dolar sit
        amet
      </motion.p>
      <div className="mx-auto flex flex-col items-center">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <CourseList selected={selectedCategory} courses={courses} />
      </div>
      <Link to="/egitimler">
        <motion.button
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="cursor-pointer bg-primary text-white font-semibold py-4 px-8 rounded-xl mt-6 hover:bg-amber-500 transition ease-in-out duration-300 delay-25 hover:scale-105 text-sm"
        >
          Tüm Eğitimler
        </motion.button>
      </Link>
    </section>
  );
};

export default PopularCourses;
