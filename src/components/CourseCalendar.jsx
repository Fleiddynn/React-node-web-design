import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const CourseCalendar = ({ egitimTakvimid }) => {
  const [takvimData, setTakvimData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!egitimTakvimid) {
      setTakvimData(null);
      setLoading(false);
      return;
    }

    const fetchCalendarData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/programs/${egitimTakvimid}`
        );
        setTakvimData(response.data);
      } catch (err) {
        setError("Takvim verileri yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchCalendarData();
  }, [egitimTakvimid]);

  const formatProgramEntry = (data) => {
    if (!data) return null;

    const programs = [];

    if (
      data.haftasonu_tarih ||
      data.haftasonu_gunler ||
      data.haftasonu_saatler ||
      data.haftasonu_sure ||
      data.haftasonu_yer ||
      data.haftasonu_ucret !== null
    ) {
      programs.push({
        type: "Hafta Sonu",
        date: data.haftasonu_tarih,
        days: data.haftasonu_gunler,
        hours: data.haftasonu_saatler,
        duration: data.haftasonu_sure,
        location: data.haftasonu_yer,
        price: data.haftasonu_ucret,
      });
    }

    if (
      data.haftaici_tarih ||
      data.haftaici_gunler ||
      data.haftaici_saatler ||
      data.haftaici_sure ||
      data.haftaici_yer ||
      data.haftaici_ucret !== null
    ) {
      programs.push({
        type: "Hafta İçi",
        date: data.haftaici_tarih,
        days: data.haftaici_gunler,
        hours: data.haftaici_saatler,
        duration: data.haftaici_sure,
        location: data.haftaici_yer,
        price: data.haftaici_ucret,
      });
    }

    if (
      data.online_tarih ||
      data.online_gunler ||
      data.online_saatler ||
      data.online_sure ||
      data.online_yer ||
      data.online_ucret !== null
    ) {
      programs.push({
        type: "Online",
        date: data.online_tarih,
        days: data.online_gunler,
        hours: data.online_saatler,
        duration: data.online_sure,
        location: data.online_yer,
        price: data.online_ucret,
      });
    }

    return {
      id: data.id,
      programs: programs,
    };
  };

  const programEntry = formatProgramEntry(takvimData);

  if (loading) {
    return <div className="text-center p-6">Eğitim takvimi yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  if (!programEntry || programEntry.programs.length === 0) {
    return (
      <div className="text-center p-6 text-gray-500">
        Bu eğitim için takvim bilgisi bulunmamaktadır.
      </div>
    );
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
              Eğitim Takvimi #{programEntry.id}
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
                        {key === "price" &&
                        program[key] !== null &&
                        program[key] !== undefined &&
                        program[key] !== "" ? (
                          <>
                            {Number(program[key]).toLocaleString("tr-TR", {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            })}
                            TL + KDV
                          </>
                        ) : (
                          program[key] || "-"
                        )}
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
