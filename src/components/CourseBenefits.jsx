import {
  BriefcaseIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const CourseBenefits = () => {
  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 text-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h3 className="text-3xl font-bold text-primary mb-4 md:col-span-2 text-center">
        Dış Ticaret Eğitiminin Kazandıracakları
      </h3>
      <motion.div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
        <BriefcaseIcon className="w-10 h-10 text-primary mb-3" />
        <p className="text-base font-medium">
          Günümüzün gözde mesleklerinden birine sahip olacaksınız.
        </p>
      </motion.div>
      <motion.div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
        <CheckCircleIcon className="w-10 h-10 text-primary mb-3" />
        <p className="text-base font-medium">
          Bir firmanın tüm dış ticaret işlemlerini rahatlıkla
          yürütebileceksiniz.
        </p>
      </motion.div>
      <motion.div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
        <GlobeAltIcon className="w-10 h-10 text-primary mb-3" />
        <p className="text-base font-medium">
          Firmanızı uluslararası pazarlara açarak yeni müşteriler bulacak,
          satışlarınızı arttıracaksınız.
        </p>
      </motion.div>
      <motion.div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center text-center">
        <CurrencyDollarIcon className="w-10 h-10 text-primary mb-3" />
        <p className="text-base font-medium">
          Firmanızın üretimde kullandığı hammaddeleri ya da yurtiçinde talep
          gören ürünleri uluslararası pazarlarda araştırıp daha uygun fiyata
          ithal edeceksiniz.
        </p>
      </motion.div>
      <motion.div className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center text-center md:col-span-2">
        <ChartBarIcon className="w-10 h-10 text-primary mb-3" />
        <p className="text-base font-medium">
          Tüm dış ticaret işlemlerini en iyi şekilde organize edip firmanızı en
          yüksek kârlılığa ulaştıracak vizyona ulaşacaksınız.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default CourseBenefits;
