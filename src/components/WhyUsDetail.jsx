import { motion } from "framer-motion";
import PropTypes from "prop-types";

const WhyUsDetail = ({ service }) => {
  return (
    <div className="container mx-auto px-3 sm:px-9 lg:px-12">
      <div className="w-full bg-white p-6 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-20">
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.img
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              src={service.image}
              alt={service.title}
              className="w-full max-w-[300px] lg:max-w-[400px] h-auto object-cover rounded-md"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <motion.p
              initial={{ x: -50 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-primary font-normal mb-2 text-sm"
            >
              Niçin Biz
            </motion.p>
            <motion.h3
              initial={{ opacity: 0, y: -25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-xl lg:text-2xl font-bold mb-2"
            >
              {service.heading}
            </motion.h3>
            <motion.p
              initial={{ x: 100 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-600 text-sm lg:text-base mb-4"
            >
              {service.description}
            </motion.p>
            <ul className="list-none">
              {service.features.map((feature, index) => (
                <motion.li
                  initial={{ x: -100 }}
                  whileInView={{ x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  key={index}
                  className="flex items-center mb-2 text-sm lg:text-base"
                >
                  <motion.span
                    initial={{ x: -75 }}
                    whileInView={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                    viewport={{ once: true }}
                    className="text-orange-500 mr-2"
                  >
                    ✔
                  </motion.span>{" "}
                  {feature}
                </motion.li>
              ))}
            </ul>
            <motion.button
              initial={{ y: 50 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md cursor-pointer transition duration-300 hover:scale-105 active:scale-95 hover:bg-secondary"
            >
              Detaylar
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

WhyUsDetail.propTypes = {
  service: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    heading: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    features: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default WhyUsDetail;
