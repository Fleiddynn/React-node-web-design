import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function CourseCard({ course }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 2 }}
      viewport={{ once: true }}
      className="group bg-white rounded-2xl shadow-xl shadow-gray-300/50 overflow-hidden hover:scale-105 transition ease-in-out duration-300 delay-25 h-80 w-80 cursor-pointer"
    >
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        <img
          src={course.image}
          alt={course.title}
          loading="lazy"
          className="w-full h-40 object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-head group-hover:text-primary transition ease-in-out duration-300 delay-25">
          {course.title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2">
          {course.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="px-2 py-1 bg-gray-100 text-secondary rounded-md">
            7hr 24m
          </span>
          <span className="px-2 py-1 bg-gray-100 text-secondary rounded-md capitalize">
            {course.category}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};
