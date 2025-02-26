import { useState, useEffect } from "react";
import {
  AcademicCapIcon,
  CheckBadgeIcon,
  UserGroupIcon,
  ArrowPathIcon,
  BookOpenIcon,
  BriefcaseIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

export default function CertificationAndBenefits() {
  const [activeDetail, setActiveDetail] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const benefits = [
    {
      id: 1,
      title: "Süresiz & Ücretsiz Danışmanlık",
      icon: <BriefcaseIcon className="w-6 h-6 text-secondary" />,
      detail:
        "Öğrencilerimize sadece eğitim vermiyoruz, çalıştıkları işlerle ilgili karşılaştıkları her türlü soru, sorun, olay ya da proje de danışmanlık hizmeti sunuyor, iş hayatlarında yalnız bırakmıyoruz.",
    },
    {
      id: 2,
      title: "Süresiz & Ücretsiz Konu Tekrarı",
      icon: <ArrowPathIcon className="w-6 h-6 text-secondary" />,
      detail:
        "Katılımcılarımıza her ay sürekli olarak yaptığımız eğitimlerimizde ihtiyaç duydukları konularda sınırsız tekrar katılma hakkı sağlıyoruz.",
    },
    {
      id: 3,
      title: "Dış Ticaret Bilgi Bankası",
      icon: <BookOpenIcon className="w-6 h-6 text-secondary" />,
      detail:
        "İçerisinde dış ticaretle ilgili ihtiyaç duyulabilecek onbinlerce sayfalık bilgi içeren çok geniş kapsamlı bir bilgi bankası",
    },
    {
      id: 4,
      title: "Kariyer Desteği",
      icon: <BriefcaseIcon className="w-6 h-6 text-secondary" />,
      detail: "İş arayan öğrencilerimize kariyer desteği veriyoruz.",
    },
  ];

  const certificates = [
    {
      id: 1,
      title: "Dış Ticaret Uzmanlık Sertifikası",
      image:
        "https://placehold.co/800x400/e2e8f0/1e40af?text=Dış+Ticaret+Sertifikası",
    },
    {
      id: 2,
      title: "İngilizce Dış Ticaret Uzmanlık Sertifikası",
      image:
        "https://placehold.co/800x400/e2e8f0/1e40af?text=İngilizce+Dış+Ticaret+Sertifikası",
    },
    {
      id: 3,
      title: "MEB Onaylı Sertifika",
      image: "https://placehold.co/800x400/e2e8f0/1e40af?text=MEB+Sertifikası",
    },
    {
      id: 4,
      title: "Uluslararası Geçerli Sertifika",
      image:
        "https://placehold.co/800x400/e2e8f0/1e40af?text=Uluslararası+Sertifika",
    },
  ];

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto p-8 text-gray-800 grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="p-6 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <AcademicCapIcon className="w-16 h-16 text-secondary mb-4" />
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-bold text-primary mb-8"
        >
          Sertifikasyon
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <motion.div
              key={cert.id}
              className="group flex flex-col cursor-pointer bg-white rounded-lg shadow-md"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => setSelectedCertificate(cert)}
            >
              <div className="relative overflow-hidden rounded-t-lg aspect-[2/1]">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all"
                  whileHover={{ scale: 1.1 }}
                >
                  <CheckBadgeIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              </div>
              <div className="p-2 sm:p-3 md:p-4 border-t">
                <h3 className="text-xs sm:text-sm md:text-base font-medium text-gray-700">
                  {cert.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCertificate(null)}
            className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-4 max-w-3xl w-full mx-4"
            >
              <div className="relative">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-auto aspect-[16/9] object-cover rounded-lg"
                />
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <h3 className="text-xl font-bold mt-4 text-center text-gray-800">
                {selectedCertificate.title}
              </h3>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="p-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex flex-col items-center text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
          >
            <UserGroupIcon className="w-16 h-16 text-secondary mb-4" />
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="text-2xl font-bold text-primary mb-4"
          >
            Program Sonunda Katılımcılara
          </motion.h2>
        </div>

        <ul className="space-y-6">
          {benefits.map((benefit, index) => (
            <motion.li
              key={benefit.id}
              className="transition-all duration-500 ease-in-out"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => !isMobile && setActiveDetail(benefit.id)}
              onMouseLeave={() => !isMobile && setActiveDetail(null)}
            >
              <div className="flex items-center justify-between gap-2 p-2 rounded-md md:hover:bg-blue-50 md:cursor-pointer transition-all duration-300">
                <div className="flex items-center gap-2">
                  {benefit.icon}
                  <span className="font-medium">{benefit.title}</span>
                </div>
                <ChevronDownIcon
                  className={`w-5 h-5 text-secondary transition-all duration-300 transform ${
                    activeDetail === benefit.id ? "rotate-0" : "rotate-[-90deg]"
                  }`}
                />
              </div>
              <motion.div
                className={`pl-8 pr-2 text-sm text-gray-600 transition-all duration-500 ease-in-out ${
                  isMobile
                    ? "mt-2 mb-2 max-h-96 opacity-100"
                    : activeDetail === benefit.id
                    ? "max-h-32 opacity-100 mt-2 mb-2"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                {benefit.detail}
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  );
}
