import { useState } from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import axios from "axios";

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  },
});

export default function SmallForm() {
  const [focusedField, setFocusedField] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    education: "Eğitim",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/api/send-email", formData, {
        headers: { "Content-Type": "application/json" },
      });
      setMessage("E-postanız başarıyla gönderildi!");
      setFormData({ name: "", email: "", education: "Eğitim", message: "" });
    } catch (err) {
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-gradient-to-br from-orange-300 via-[#f56e13] to-orange-400 p-6 rounded-2xl max-w-4xl mx-auto mt-10"
    >
      <motion.h2
        variants={fadeInUp(0)}
        className="text-white text-center text-2xl font-bold mb-6"
      >
        Eğitime Katıl
      </motion.h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row md:flex-wrap items-stretch gap-4"
      >
        <motion.div
          variants={fadeInUp(0.1)}
          className="flex-1 min-w-[200px] bg-white/15 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center focus-within:ring-2 focus-within:ring-white transition hover:scale-105 transform origin-center duration-300 ease-in-out"
        >
          <UserIcon className="h-5 w-5 text-white mr-2" />
          <input
            type="text"
            name="name"
            placeholder="İsim"
            value={formData.name}
            onChange={handleChange}
            required
            className="bg-transparent appearance-none w-full placeholder-white/70 text-white focus:outline-none text-sm"
          />
        </motion.div>

        <motion.div
          variants={fadeInUp(0.2)}
          className="flex-1 min-w-[200px] bg-white/15 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center focus-within:ring-2 focus-within:ring-white transition hover:scale-105 transform origin-center duration-300 ease-in-out"
        >
          <EnvelopeIcon className="h-5 w-5 text-white mr-2" />
          <input
            type="email"
            name="email"
            placeholder="E-posta"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-transparent appearance-none w-full placeholder-white/70 text-white focus:outline-none text-sm"
          />
        </motion.div>

        <motion.div
          variants={fadeInUp(0.3)}
          className="flex-1 min-w-[150px] bg-white/15 backdrop-blur-sm rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-white transition hover:scale-105 transform origin-center duration-300 ease-in-out"
        >
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            className="bg-transparent appearance-none w-full text-white focus:outline-none text-sm"
          >
            <option disabled value="Eğitim">
              Eğitim Türü
            </option>
            <option className="text-black">Online</option>
            <option className="text-black">Yüzyüze</option>
          </select>
        </motion.div>

        <motion.button
          variants={fadeInUp(0.4)}
          type="submit"
          disabled={loading}
          className="w-full md:w-auto bg-orange-400 text-white font-semibold px-5 py-2 rounded-lg hover:bg-orange-300 transition disabled:opacity-50 text-sm cursor-pointer hover:scale-105 transform origin-center duration-300 ease-in-out"
        >
          {loading ? "Gönderiliyor..." : "Gönder"}
        </motion.button>

        <motion.div
          variants={fadeInUp(0.5)}
          className="w-full bg-white/15 backdrop-blur-sm rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-white transition hover:scale-105 transform origin-center duration-300 ease-in-out"
        >
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Mesajınız"
            rows={3}
            className="w-full bg-transparent appearance-none placeholder-white/70 text-white focus:outline-none resize-none text-sm"
          ></textarea>
        </motion.div>
      </form>

      <div className="mt-4 text-center space-y-2">
        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={`text-sm ${
              message.includes("başarıyla gönderildi")
                ? "text-green-200"
                : "text-red-200"
            }`}
          >
            {message}
          </motion.p>
        )}
        <motion.div variants={fadeInUp(0.7)}>
          <Link
            to="/iletisim"
            className="text-white text-xs underline hover:text-white/90"
          >
            İletişim Formu
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
