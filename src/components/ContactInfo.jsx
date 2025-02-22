import React from "react";
import { motion } from "framer-motion";
import ContactItem from "./ContactItem.jsx";
import { PhoneIcon, EnvelopeIcon, MapIcon } from "@heroicons/react/24/solid";
import SocialMediaIcons from "./SocialMediaIcons.jsx";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const ContactInfo = () => {
  return (
    <motion.div
      className="max-w-lg p-6 bg-white rounded-2xl shadow-lg space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-3xl font-bold text-center text-primary mb-6 border-b-2 border-primary pb-2"
        variants={itemVariants}
      >
        İletişim Bilgileri
      </motion.h2>

      <motion.div
        className="space-y-6 pb-4 border-b border-gray-300"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants}>
          <ContactItem
            icon={PhoneIcon}
            label="Telefon"
            text="+90 532 574 64 08"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ContactItem
            icon={EnvelopeIcon}
            label="E-Posta"
            text="iletisim@disticaretplatformu.com"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ContactItem
            icon={MapIcon}
            label="Adres"
            text="Lati Lokum Sokak No: 2 Kat: 6 Mecidiyeköy İstanbul"
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="mt-6 flex justify-center space-x-4"
        variants={itemVariants}
      >
        <SocialMediaIcons showLabels={true} />
      </motion.div>

      <motion.div className="w-full mt-6" variants={itemVariants}>
        <motion.iframe
          className="w-full h-64 rounded-xl shadow-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3112.0534032137365!2d28.98722861533763!3d41.04512017929717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab78d4f5c99c3%3A0xa4b05d1d9db2a7a6!2sMecidiyek%C3%B6y%2C%20%C4%B0stanbul!5e0!3m2!1str!2str!4v1646013987611!5m2!1str!2str"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          variants={itemVariants}
        ></motion.iframe>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;
