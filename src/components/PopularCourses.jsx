import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import CourseList from "./CourseList";
import courseData from "../data/courseData.json";
import { motion } from "framer-motion";

import {
  BookmarkIcon,
  CodeBracketIcon,
  PaintBrushIcon,
  MegaphoneIcon,
} from "@heroicons/react/24/solid";

const categoryIcons = {
  all: <BookmarkIcon className="w-5 h-5" />,
  uzmanlık: <PaintBrushIcon className="w-5 h-5" />,
  lojistik: <CodeBracketIcon className="w-5 h-5" />,
  gümrük: <MegaphoneIcon className="w-5 h-5" />,
};

const PopularCourses = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    {
      id: "all",
      name: "Tümü",
      icon: categoryIcons.all,
    },
    ...Array.from(new Set(courseData.map((course) => course.category))).map(
      (category) => ({
        id: category,
        name: category.charAt(0).toUpperCase() + category.slice(1),
        icon: categoryIcons[category] || <BookmarkIcon />,
      })
    ),
  ];

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
        <CourseList selected={selectedCategory} courses={courseData} />
      </div>
      <motion.button
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
        className="cursor-pointer bg-primary text-white font-semibold py-4 px-8 rounded-xl mt-6 hover:bg-amber-500 transition ease-in-out duration-300 delay-25 hover:scale-105 text-sm"
      >
        Tüm Eğitimler
      </motion.button>
    </section>
  );
};

export default PopularCourses;
