import React from "react";
import { motion } from "framer-motion";

const Founder = () => {
  return (
    <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
      <motion.div
        initial={{ opacity: 0, x: -200 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-1/3 flex justify-center"
      >
        <img
          src="https://placehold.co/200x200"
          alt="Recep Heptaş"
          className="rounded-full w-48 h-48 object-cover border-4 border-primary"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 300 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="md:w-2/3 text-center md:text-left"
      >
        <motion.h3
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-2xl font-semibold text-primary"
        >
          Recep Heptaş
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, x: 200 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-lg text-gray-700"
        >
          Kurucu &amp; CEO
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 200 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-gray-600 mt-4"
        >
          20+ Yıllık tecrübesiyle Dış Ticaret Platformunu ayakta tutan isim. En
          iyi eğitmenimiz. Parti kursada oy versek. Ornare nullam varius finibus
          feugiat sed bibendum senectus. Quis vivamus ridiculus lacus posuere
          leo blandit ad dis. Laoreet dictumst neque purus tempus eget elit est
          enim.
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Founder;
