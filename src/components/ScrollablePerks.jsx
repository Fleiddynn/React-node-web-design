import React from "react";
import { motion } from "framer-motion";
import {
  CheckBadgeIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  AcademicCapIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

const values = [
  {
    title: "Commitment",
    icon: <CheckBadgeIcon className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    title: "Accessibility",
    icon: <GlobeAltIcon className="w-6 h-6" />,
    color: "bg-red-500",
  },
  {
    title: "Openness",
    icon: <MagnifyingGlassIcon className="w-6 h-6" />,
    color: "bg-yellow-500",
  },
  {
    title: "Innovation",
    icon: <LightBulbIcon className="w-6 h-6" />,
    color: "bg-blue-400",
  },
  {
    title: "Excellence",
    icon: <AcademicCapIcon className="w-6 h-6" />,
    color: "bg-blue-600",
  },
  {
    title: "Team work",
    icon: <UsersIcon className="w-6 h-6" />,
    color: "bg-red-400",
  },
];

const ScrollablePerks = () => {
  return (
    <div className="flex flex-col md:flex-row items-start max-w-5xl mx-auto p-6 gap-12">
      <div className="md:w-1/3">
        <motion.h3
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary font-bold uppercase"
        >
          Değerlerimiz
        </motion.h3>
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-semibold mt-2"
        >
          Vizyonumuz misyonumuz
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-gray-600 mt-2"
        >
          Convallis vivamus at cras porta nibh velit aliquam eget in faucibus mi
          tristique aliquam ultrices.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mt-4 px-6 py-3 bg-secondary text-white rounded-lg shadow-md hover:bg-blue-700 transition delay-50 duration-300 hover:scale-105 cursor-pointer"
        >
          Eğitimler
        </motion.button>
      </div>
      <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
        {values.map((value, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            className={`flex flex-col items-center text-center p-6 bg-white shadow-md rounded-lg transform transition duration-300 hover:scale-105 hover:shadow-lg w-full h-48 justify-center ${
              index % 2 !== 0 ? "translate-y-4" : ""
            }`}
          >
            <div
              className={`w-8 h-8 flex items-center justify-center text-white rounded-full ${value.color}`}
            >
              {value.icon}
            </div>
            <h3 className="text-lg font-semibold mt-4">{value.title}</h3>
            <p className="text-gray-600 text-sm mt-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ScrollablePerks;
