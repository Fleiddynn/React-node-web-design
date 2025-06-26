import { motion } from "framer-motion";
import PropTypes from "prop-types";

export default function CategoryFilter({ categories, selected, onSelect }) {
  const middleIndex = Math.ceil(categories.length / 2);
  const topCategories = categories.slice(0, middleIndex);
  const bottomCategories = categories.slice(middleIndex);

  const renderButtons = (cats) =>
    cats.map((cat) => (
      <button
        key={cat.id}
        onClick={() => onSelect(cat.id)}
        className={`flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl transition-all hover:scale-110 ease-in-out duration-300 border border-zinc-200
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
    ));

  return (
    <div className="flex flex-col gap-4 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center"
      >
        {renderButtons(topCategories)}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center"
      >
        {renderButtons(bottomCategories)}
      </motion.div>
    </div>
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
