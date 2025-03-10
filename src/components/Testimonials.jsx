import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import testimonialData from "./../data/testimonials.json";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { testimonials } = testimonialData;

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setStartIndex((prev) => (prev + 1 >= testimonials.length ? 0 : prev + 1));
    }, 10000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleNext = () => {
    setDirection(1);
    setStartIndex((prev) => (prev + 1 >= testimonials.length ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setDirection(-1);
    setStartIndex((prev) =>
      prev - 1 < 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const getVisibleTestimonials = () => {
    const visibleItems = [];
    for (let i = 0; i < 4; i++) {
      const index = (startIndex + i) % testimonials.length;
      visibleItems.push(testimonials[index]);
    }
    return visibleItems;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-bold text-center mb-5 text-primary"
      >
        Katılımcı Görüşleri
      </motion.h1>
      <div className="relative overflow-hidden">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
        >
          <AnimatePresence initial={false} mode="popLayout">
            {getVisibleTestimonials().map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${startIndex}-${index}`}
                variants={itemVariants}
                initial={{ x: direction * 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction * -100, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="p-4 bg-white rounded-lg shadow-sm border border-gray-100 h-full flex flex-col hover:shadow transition-shadow duration-300"
              >
                <div className="flex-1">
                  <div className="text-2xl mb-2 text-primary/30">&ldquo;</div>
                  <p className="text-gray-700 text-sm leading-relaxed line-clamp-4">
                    {testimonial.text}
                  </p>
                  <div className="text-2xl mb-2 text-right text-primary/30">
                    &rdquo;
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <p className="font-bold text-right text-sm text-primary">
                    {testimonial.person}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex justify-center gap-3 mt-6"
      >
        <button
          onClick={handlePrev}
          className="cursor-pointer px-3 py-1.5 bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-all duration-300 shadow-sm hover:shadow flex items-center gap-1.5"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Önceki
        </button>
        <button
          onClick={handleNext}
          className="cursor-pointer px-3 py-1.5 bg-white border border-primary text-primary hover:bg-primary hover:text-white rounded-md transition-all duration-300 shadow-sm hover:shadow flex items-center gap-1.5"
        >
          Sonraki
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </motion.div>
    </div>
  );
}
