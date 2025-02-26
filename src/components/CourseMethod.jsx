import {
  BriefcaseIcon,
  GlobeAltIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

export default function CourseMethod() {
  return (
    <motion.div
      className="w-full mx-auto p-4 lg:p-6 text-gray-800"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h2 className="text-2xl lg:text-3xl font-bold text-primary mb-6 text-center">
        Dış Ticaret Eğitimi Metodumuz
      </motion.h2>
      <div className="space-y-4 lg:space-y-6">
        <motion.p className="text-base lg:text-lg">
          Dış Ticaret Eğitimimiz alanında uzman, sektörün içinden gelen,
          deneyimli eğitmenler tarafından uygulamalı olarak sunulmaktadır.
        </motion.p>
        <motion.div className="flex flex-row items-start gap-3 lg:gap-4">
          <BriefcaseIcon className="w-6 h-6 lg:w-8 lg:h-8 min-w-[24px] lg:min-w-[32px] text-primary mt-1" />
          <p className="text-base lg:text-lg">
            Katılımcılara eğitim esnasında firma kurup, ürün, sektör seçtirerek
            -bu bilgi iş hayatında nasıl karşıma çıkar ve nasıl kullanabilirim
            mantığıyla- işliyoruz.
          </p>
        </motion.div>
        <motion.div className="flex flex-row items-start gap-3 lg:gap-4">
          <GlobeAltIcon className="w-6 h-6 lg:w-8 lg:h-8 min-w-[24px] lg:min-w-[32px] text-primary mt-1" />
          <p className="text-base lg:text-lg">
            Katılımcıların tüm konuların mantığını kavramış olmalarına özen
            gösteriyor, dış ticaret eğitimini tüm yönleriyle uygulamalı olarak
            gösteriyoruz.
          </p>
        </motion.div>
        <motion.div className="flex flex-row items-start gap-3 lg:gap-4">
          <CheckCircleIcon className="w-6 h-6 lg:w-8 lg:h-8 min-w-[24px] lg:min-w-[32px] text-primary mt-1" />
          <p className="text-base lg:text-lg">
            Eğitim sonunda sunduğumuz staj imkânıyla da öğrendiklerini pratikte
            de görmelerini ve kısa zamanda bir firmanın dış ticaret departmanını
            yönetebilecek, firmaları adına yurtdışı pazarlardan müşteri ve
            tedarikçi araştırması yapabilecek, ihracat, ithalat, gümrük,
            lojistik, banka süreçlerini yürütebilecek seviyeye gelmelerini
            sağlıyoruz.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
