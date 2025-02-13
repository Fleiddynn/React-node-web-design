import React from "react";
import EventCard from "./EventCard.jsx";
import { motion } from "framer-motion";
import courseData from "./../data/courseData.json";

const UpcomingEvents = () => {
  const MAX_COURSES = 4;
  const filteredCourses = courseData.slice(0, MAX_COURSES);

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
      {filteredCourses.map((course) => (
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
