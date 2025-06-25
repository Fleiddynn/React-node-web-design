import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
  ArrowTrendingUpIcon,
  GlobeAltIcon,
  ShoppingCartIcon,
  DocumentTextIcon,
  TruckIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  MapIcon,
  ChartPieIcon,
  CheckBadgeIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChevronUpIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

const CourseProgram = ({ programId }) => {
  const [fullProgramData, setFullProgramData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const iconComponents = useMemo(
    () => ({
      TrendingUp: ArrowTrendingUpIcon,
      Globe: GlobeAltIcon,
      ShoppingCart: ShoppingCartIcon,
      FileText: DocumentTextIcon,
      TruckIcon: TruckIcon,
      DollarSign: CurrencyDollarIcon,
      Award: AcademicCapIcon,
      Map: MapIcon,
      PieChart: ChartPieIcon,
      CheckSquare: CheckBadgeIcon,
      Book: BookOpenIcon,
      Users: UserGroupIcon,
    }),
    []
  );

  useEffect(() => {
    if (!programId) {
      setFullProgramData(null);
      setLoading(false);
      return;
    }

    const fetchFullProgram = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/egitim-programlari/${programId}`
        );
        setFullProgramData(response.data);
      } catch (err) {
        console.error("Eğitim programı yüklenirken hata:", err);
        setError("Eğitim programı yüklenirken bir hata oluştu.");
      } finally {
        setLoading(false);
      }
    };

    fetchFullProgram();
  }, [programId]);

  const [openPanels, setOpenPanels] = useState({});

  const togglePanel = (sectionId) => {
    setOpenPanels((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  if (loading)
    return <div className="text-center p-6">Eğitim programı yükleniyor...</div>;
  if (error) return <div className="text-center p-6 text-red-500">{error}</div>;
  if (
    !fullProgramData ||
    !fullProgramData.program_sections ||
    fullProgramData.program_sections.length === 0
  ) {
    return (
      <div className="text-center p-6 text-gray-500">
        Bu eğitim için detaylı program bilgisi bulunmamaktadır.
      </div>
    );
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-white to-secondary/10 rounded-xl shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold text-secondary mb-2">
          {fullProgramData.program_name.toUpperCase()}
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-secondary to-secondary/80 mx-auto rounded-full"></div>
      </motion.div>

      <div className="space-y-3">
        {fullProgramData.program_sections.map((section, index) => {
          const IconComponent =
            iconComponents[section.iconType] || ArrowTrendingUpIcon;
          const isOpen = openPanels[section.id || index];
          const contentCount = section.content?.length || 0;

          return (
            <motion.div
              key={section.id || `section-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`border ${
                isOpen ? "border-secondary" : "border-gray-200"
              } rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg`}
            >
              <button
                className={`w-full flex justify-between items-center p-4 cursor-pointer
                                ${
                                  isOpen
                                    ? "bg-gradient-to-r from-secondary to-secondary/90 text-white"
                                    : "bg-white hover:bg-gray-50"
                                } transition-all duration-300 text-left group`}
                onClick={() => togglePanel(section.id || index)}
              >
                <div className="flex items-center">
                  <div className="mr-3">
                    {React.createElement(IconComponent, {
                      className: "w-6 h-6",
                    })}
                  </div>
                  <div>
                    <div
                      className={`text-sm ${
                        isOpen ? "text-blue-100" : "text-blue-500"
                      }`}
                    >
                      {index + 1}. BÖLÜM
                    </div>
                    <span
                      className={`font-medium ${
                        isOpen ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {section.title}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex items-center ${
                    isOpen ? "text-white" : "text-blue-100"
                  }`}
                >
                  <div className="mr-2 text-sm bg-opacity-80 px-2 py-0.5 rounded-full">
                    {contentCount} konu
                  </div>
                  {isOpen ? (
                    <ChevronUpIcon className="h-5 w-5" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="p-5 bg-white">
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {section.content.map((item, contentIndex) => (
                          <motion.li
                            key={contentIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: contentIndex * 0.05 }}
                            className="flex items-start"
                          >
                            <div className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5">
                              <svg viewBox="0 0 20 20" fill="currentColor">
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <span className="text-gray-700 hover:text-blue-600 transition-colors duration-200">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default CourseProgram;
