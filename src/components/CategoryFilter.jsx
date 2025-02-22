import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <motion.div
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="flex gap-4 p-4 flex-wrap justify-center"
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-110 ease-in-out duration-300 delay-25 border-[1px] border-zinc-200
          ${
            selected === cat.id
              ? `${cat.color} font-semibold shadow-md text-primary`
              : "bg-gray-100 text-gray-400 opacity-70"
          }
        `}
        >
          {cat.icon}
          <span>{cat.name}</span>
        </button>
      ))}
    </motion.div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.element,
      color: PropTypes.string,
    })
  ).isRequired,
  selected: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
