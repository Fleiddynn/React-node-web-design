import React from "react";
import { motion } from "framer-motion";

const CourseCalendar = ({ programEntry }) => {
  if (!programEntry || !programEntry.programs) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="p-4"
    >
      <div className="w-full max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <div
            key={programEntry.id}
            className="mb-8 border border-gray-200 rounded-lg p-4"
          >
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Tablo #{programEntry.id}
            </h2>
            <table className="w-full border-collapse bg-white mb-4">
              <thead>
                <tr>
                  <th className="p-3 text-left bg-gray-100"></th>
                  {programEntry.programs.map((program, index) => (
                    <th
                      key={index}
                      className="p-3 text-center bg-orange-500 text-white border-x border-orange-400 font-bold"
                    >
                      {program.type}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Tarih", "date"],
                  ["Günler", "days"],
                  ["Saatler", "hours"],
                  ["Süre", "duration"],
                  ["Yer", "location"],
                  ["Ücret", "price"],
                ].map(([label, key]) => (
                  <tr
                    key={key}
                    className="hover:bg-orange-50 transition-colors"
                  >
                    <td className="p-3 font-semibold bg-gray-50">{label}</td>
                    {programEntry.programs.map((program, index) => (
                      <td
                        key={index}
                        className={`p-3 text-center border-x border-gray-200 ${
                          key === "price" ? "font-bold text-orange-500" : ""
                        } ${key === "days" ? "whitespace-pre-line" : ""}`}
                      >
                        {program[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCalendar;
