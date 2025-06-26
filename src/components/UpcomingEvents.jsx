import EventCard from "./EventCard.jsx";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";

const UpcomingEvents = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const MAX_COURSES = 4;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:5000/api/egitimler-sorted"
        );

        const data = response.data;

        const filteredCourses = data.slice(0, MAX_COURSES);

        setCourses(filteredCourses);
      } catch (err) {
        console.error("Eğitimler çekilirken hata oluştu:", err);
        if (axios.isAxiosError(err)) {
          setError(
            `Eğitimler yüklenirken bir sorun oluştu: ${
              err.response ? err.response.status : err.message
            }`
          );
        } else {
          setError("Eğitimler yüklenirken beklenmeyen bir sorun oluştu.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Yükleniyor...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        {error}
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-gray-500">
        Yaklaşan eğitim bulunmamaktadır.
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="bg-card p-8 rounded-lg shadow-lg mx-auto max-w-screen-lg mb-5"
    >
      <motion.h2
        initial={{ opacity: 0.5, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-4 text-center text-head"
      >
        Yaklaşan Eğitimlerimiz
      </motion.h2>
      {courses.map((course) => (
        <EventCard key={course.id} course={course} />
      ))}

      <div className="mt-8 text-center">
        <a className="text-secondary hover:bg-secondary/80 hover:text-white py-2 px-4 rounded transition ease-in-out duration-300 delay-25 cursor-pointer">
          Daha Fazla
        </a>
      </div>
    </motion.section>
  );
};

export default UpcomingEvents;
