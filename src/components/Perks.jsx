import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  BriefcaseIcon,
  ClipboardDocumentCheckIcon,
  ChatBubbleLeftRightIcon,
  ArrowPathIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    title: "Kariyer Desteği",
    description:
      "Dış ticaret eğitimi öğrencilerine iş hayatında kariyer desteği",
    icon: BriefcaseIcon,
    color: "text-purple-500 border-purple-500",
  },
  {
    title: "Uygulamalı Eğitimler",
    description: "Gerçek iş senaryolarında uygulamalı öğrenim",
    icon: ClipboardDocumentCheckIcon,
    color: "text-blue-500 border-blue-500",
  },
  {
    title: "Uzman Eğitmenler",
    description: "Sektördeki deneyime sahip eğitmenlerden eğitim alma",
    icon: UserGroupIcon,
    color: "text-green-500 border-green-500",
  },
  {
    title: "Sınırsız Tekrar",
    description:
      "Bundan sonraki eğitimlere sınırsız ve ücretsiz katılma imkanı",
    icon: ArrowPathIcon,
    color: "text-lime-500 border-lime-500",
  },
  {
    title: "Sınırsız Danışmanlık",
    description: "İşlerinize sınırsız danışmanlık fırsatı",
    icon: ChatBubbleLeftRightIcon,
    color: "text-orange-500 border-orange-500",
  },
  {
    title: "Sertifika Fırsatları",
    description: "Dış ticaret eğitimlerinde 4 sertifika alma imkanı",
    icon: AcademicCapIcon,
    color: "text-yellow-500 border-yellow-500",
  },
];

const Perks = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-center p-4 md:p-8">
      <h2 className="text-2xl font-bold mb-6 text-head">Farkımız</h2>
      <div className="relative w-full max-w-[650px] h-[650px] flex items-center justify-center">
        <div className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] border-2 border-gray-300 rounded-full"></div>
        <div className="absolute w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-gray-100 shadow-md border-2 border-gray-300">
          <AcademicCapIcon className="w-10 h-10 md:w-14 md:h-14 text-blue-600" />
        </div>

        {features.map((feature, index) => {
          const angle = (index / features.length) * (2 * Math.PI);
          const radius = windowWidth < 768 ? 160 : 240;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          return (
            <motion.div
              key={index}
              className={`absolute w-32 h-32 md:w-48 md:h-48 p-2 md:p-5 hover:scale-105 transition ease-in-out duration-300 delay-25 bg-white border rounded-lg shadow-md flex flex-col items-center ${feature.color}`}
              style={{ transform: `translate(${x}px, ${y}px)` }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="min-w-8 min-h-8 md:w-10 md:h-10 mb-2 md:mb-3 hidden md:block" />
              <h3 className="font-semibold text-sm md:text-lg text-center">
                {feature.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Perks;
