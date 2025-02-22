import { useState } from "react";
import WhyUsData from "./../data/whyUsData.json";
import WhyUsDetail from "./WhyUsDetail.jsx";
import { motion } from "framer-motion";

const WhyUs = () => {
  const [selectedService, setSelectedService] = useState(WhyUsData[0]);

  return (
    <div className="flex flex-col lg:flex-row bg-white p-6 lg:p-10">
      <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
        <motion.h2
          initial={{ opacity: 0, y: -25, x: -25 }}
          whileInView={{ opacity: 1, y: 0, x: 0 }}
          transition={{ duration: 0.57 }}
          viewport={{ once: true }}
          className="text-xl lg:text-2xl font-bold mb-4 text-head"
        >
          Niçin Biz
        </motion.h2>
        <div className="border-b mb-4"></div>
        {WhyUsData.map((service) => (
          <motion.button
            initial={{ x: -200 }}
            whileInView={{ x: 0 }}
            transition={{ duration: 0.3 }}
            viewport={{ once: true }}
            key={service.id}
            onClick={() => setSelectedService(service)}
            className={`text-black hover:text-white cursor-pointer block w-full text-left py-2 px-4 mb-2 rounded-md font-semibold transition ease-in-out duration-300 delay-75 hover:scale-105 ${
              selectedService.id === service.id
                ? "bg-primary text-white"
                : "hover:bg-secondary"
            }`}
          >
            {service.title}
          </motion.button>
        ))}
      </div>

      <WhyUsDetail service={selectedService} />
    </div>
  );
};

WhyUs.propTypes = {
  // This component doesn't take any props currently
};

export default WhyUs;
