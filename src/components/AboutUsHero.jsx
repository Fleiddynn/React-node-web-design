import React from "react";
import { motion } from "framer-motion";

const AboutUsHero = () => {
  return (
    <section className="h-full relative bg-white px-6 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-primary font-semibold uppercase"
        >
          Hakkımızda
        </motion.h3>
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-head mb-4"
        >
          Dış Ticaret Platformu
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
        >
          Convallis vivamus at cras porta nibh velit aliquam eget in faucibus mi
          tristique aliquam ultrices sit cras nascetur in elementum placerat sed
          viverra risus in turpis vitae sed est tincidunt vitae.
        </motion.p>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 mt-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-72 h-80 bg-gray-300 rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="https://via.placeholder.com/300"
            alt="Placeholder"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-72 h-80 bg-gray-300 rounded-2xl overflow-hidden shadow-lg"
        >
          <img
            src="https://via.placeholder.com/300"
            alt="Placeholder"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsHero;
