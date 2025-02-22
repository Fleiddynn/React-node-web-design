import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

const SmallForm = () => {
  const [focusedField, setFocusedField] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-lg max-w-6xl mx-auto overflow-hidden mt-5"
    >
      <div className="text-white font-bold text-2xl mb-6 md:mb-0 md:mr-6">
        <p>Eğitimlerden</p>
        <p>haberar olun!</p>
        <button className="mt-4 flex items-center gap-2 bg-secondary text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-900 hover:scale-105 transition duration-300 delay-15 ease-in-out cursor-pointer">
          <ArrowRightIcon className="h-5 w-5" /> Kayıt Ol!
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm lg:w-1/3 hover:shadow-md hover:scale-105 transition duration-300 delay-15 ease-in-out"
          >
            <UserIcon
              className={`h-5 min-w-5  mr-2 ${
                focusedField === "name" ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <input
              type="text"
              placeholder="İsim"
              className="flex-1 bg-transparent focus:outline-none"
              onFocus={() => setFocusedField("name")}
              onBlur={() => setFocusedField(null)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm lg:w-1/3 hover:shadow-md hover:scale-105 transition duration-300 delay-15 ease-in-out"
          >
            <EnvelopeIcon
              className={`h-5 min-w-5 mr-2 ${
                focusedField === "email" ? "text-blue-600" : "text-gray-400"
              }`}
            />
            <input
              type="email"
              placeholder="E-posta"
              className="flex-1 bg-transparent focus:outline-none"
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm lg:w-1/3 hover:shadow-md hover:scale-105 transition duration-300 delay-15 ease-in-out"
          >
            <select
              className="w-full bg-transparent focus:outline-none"
              onFocus={() => setFocusedField("education")}
              onBlur={() => setFocusedField(null)}
            >
              <option>Eğitim</option>
              <option>Online</option>
              <option>Yüzyüze</option>
            </select>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition duration-300 delay-15 ease-in-out"
        >
          <textarea
            placeholder="Mesajınız"
            className="w-full bg-transparent focus:outline-none h-15 resize-none"
            onFocus={() => setFocusedField("message")}
            onBlur={() => setFocusedField(null)}
          ></textarea>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SmallForm;
