import { useState, useEffect, useMemo } from "react";
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
import courseProgramData from "./../data/courseProgramData.json";
import { motion, AnimatePresence } from "framer-motion";

const CourseProgram = () => {
  const [programData, setProgramData] = useState([]);

  const iconComponents = useMemo(
    () => ({
      TrendingUp: <ArrowTrendingUpIcon className="w-6 h-6" />,
      Globe: <GlobeAltIcon className="w-6 h-6" />,
      ShoppingCart: <ShoppingCartIcon className="w-6 h-6" />,
      FileText: <DocumentTextIcon className="w-6 h-6" />,
      TruckIcon: <TruckIcon className="w-6 h-6" />,
      DollarSign: <CurrencyDollarIcon className="w-6 h-6" />,
      Award: <AcademicCapIcon className="w-6 h-6" />,
      Map: <MapIcon className="w-6 h-6" />,
      PieChart: <ChartPieIcon className="w-6 h-6" />,
      CheckSquare: <CheckBadgeIcon className="w-6 h-6" />,
      Book: <BookOpenIcon className="w-6 h-6" />,
      Users: <UserGroupIcon className="w-6 h-6" />,
    }),
    []
  );

  useEffect(() => {
    const jsonData = courseProgramData;
    const programsWithIcons = jsonData.programs.map((program) => ({
      ...program,
      icon: iconComponents[program.iconType],
    }));
    setProgramData(programsWithIcons);
  }, [iconComponents]);

  const [openPanels, setOpenPanels] = useState({});

  const togglePanel = (id) => {
    setOpenPanels((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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
          DIŞ TİCARET EĞİTİM PROGRAMI
        </h1>
        <div className="h-1 w-32 bg-gradient-to-r from-secondary to-secondary/80 mx-auto rounded-full"></div>
      </motion.div>

      <div className="space-y-3">
        {programData.map((section, index) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`border ${
              openPanels[section.id] ? "border-secondary" : "border-gray-200"
            } rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg`}
          >
            <button
              className={`w-full flex justify-between items-center p-4 cursor-pointer
              ${
                openPanels[section.id]
                  ? "bg-gradient-to-r from-secondary to-secondary/90 text-white"
                  : "bg-white hover:bg-gray-50"
              } transition-all duration-300 text-left group`}
              onClick={() => togglePanel(section.id)}
            >
              <div className="flex items-center">
                <div className="mr-3">{section.icon}</div>
                <div>
                  <div
                    className={`text-sm ${
                      openPanels[section.id] ? "text-blue-100" : "text-blue-500"
                    }`}
                  >
                    {section.id}. BÖLÜM
                  </div>
                  <span
                    className={`font-medium ${
                      openPanels[section.id] ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {section.title}
                  </span>
                </div>
              </div>
              <div
                className={`flex items-center ${
                  openPanels[section.id] ? "text-white" : "text-blue-500"
                }`}
              >
                <div className="mr-2 text-sm bg-opacity-80 px-2 py-0.5 rounded-full">
                  {section.content.length} konu
                </div>
                {openPanels[section.id] ? (
                  <ChevronUpIcon className="h-5 w-5" />
                ) : (
                  <ChevronDownIcon className="h-5 w-5" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {openPanels[section.id] && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="p-5 bg-white">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {section.content.map((item, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
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
        ))}
      </div>
    </motion.div>
  );
};

export default CourseProgram;
