import React from "react";
import { motion } from "framer-motion";
import {
  UsersIcon,
  AcademicCapIcon,
  BookOpenIcon,
} from "@heroicons/react/24/solid";

const Hero = () => {
  return (
    <section className="min-h-[calc(100vh-173px)]">
      <div className="flex flex-col h-full">
        <div className="h-full flex flex-col md:flex-row items-center justify-center bg-white text-gray-900 overflow-auto">
          <div className="container mx-auto px-8 flex flex-col md:flex-row items-center md:justify-between relative z-10">
            <motion.div
              className="w-full md:w-1/2 text-center md:text-left md:pl-8"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="bg-primary-100 text-primary inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Küçük info kutusu
              </div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Başlık <span className="text-primary">Vurgu</span>
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl lg:text-2xl mb-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                paragraf paragraf paragraf paragraf paragraf paragraf paragraf
                paragraf paragraf paragraf paragraf
              </motion.p>
              <motion.button
                className="bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-700 transition-all cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.9 }}
              >
                Hemen kayıt ol!
              </motion.button>
            </motion.div>

            <motion.div
              className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <div className="w-64 h-64 md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] bg-gray-200 rounded-lg shadow-xl flex items-center justify-center">
                <span className="text-gray-500">Image Placeholder</span>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="bg-white py-12">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <span className="text-3xl md:text-4xl font-bold text-amber-600">
                50+
              </span>
              <p className="text-lg text-gray-700">Kişi</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <span className="text-3xl md:text-4xl font-bold text-amber-600">
                150+
              </span>
              <p className="text-lg text-gray-700">Eğitim</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <span className="text-3xl md:text-4xl font-bold text-amber-600">
                150+
              </span>
              <p className="text-lg text-gray-700">Öğrenci</p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
