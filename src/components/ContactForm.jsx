import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import axios from "axios";
import { ArrowDownIcon } from "@heroicons/react/24/solid";
import courseData from "./../data/courseData.json";

const fadeInUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.6, ease: "easeOut" },
  },
});

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    reason: "",
    message: "",
    captchaVerified: false,
  });

  const [availableCourses, setAvailableCourses] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/egitimler`
        );
        setAvailableCourses(response.data);
      } catch (error) {
        console.error("Kurs verileri çekilirken hata oluştu:", error);
        setCoursesError("Kurs verileri yüklenirken bir hata oluştu.");
      } finally {
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, course: value });
    if (value) {
      const filteredCourses = availableCourses.filter((course) =>
        course.egitimAdi.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCourses);
    } else {
      setSuggestions([]);
    }
  };

  const selectCourse = (egitimAdi) => {
    setFormData((prev) => ({ ...prev, course: egitimAdi }));
    setSuggestions([]);
  };

  const onCaptchaChange = (value) => {
    setFormData({ ...formData, captchaVerified: !!value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (!formData.captchaVerified) {
      setMessage("Lütfen captcha doğrulamasını tamamlayın!");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "${import.meta.env.VITE_API_URL}/api/send-email",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setMessage("Mesajınız başarıyla gönderildi!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        course: "",
        reason: "",
        message: "",
        captchaVerified: false,
      });
    } catch (error) {
      setMessage("Bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp()}
      viewport={{ once: true }}
      onSubmit={handleSubmit}
      className="max-w-3xl p-6 rounded-2xl border-2 border-primary/30 backdrop-blur-sm shadow-xl space-y-4"
    >
      <motion.h2
        variants={fadeInUp(0.1)}
        className="text-primary text-center text-2xl font-bold mb-6"
      >
        Kurs Kayıt ve İletişim Formu
      </motion.h2>

      <motion.div
        variants={fadeInUp(0.2)}
        className="bg-primary/15 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-white transition hover:scale-105 duration-300"
      >
        <input
          type="text"
          name="fullName"
          placeholder="Ad Soyad"
          value={formData.fullName}
          onChange={handleChange}
          required
          className="w-full bg-transparent placeholder-primary/70 text-primary focus:outline-none text-sm"
        />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {["email", "phone"].map((field, index) => (
          <motion.div
            key={field}
            variants={fadeInUp(0.3 + index * 0.1)}
            className="bg-primary/15 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-white transition hover:scale-105 duration-300"
          >
            <input
              type={field === "email" ? "email" : "tel"}
              name={field}
              placeholder={field === "email" ? "E-posta" : "Telefon"}
              value={formData[field]}
              onChange={handleChange}
              required
              className="w-full bg-transparent placeholder-primary/70 text-primary focus:outline-none text-sm"
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={fadeInUp(0.5)}
        className="bg-primary/15 px-4 py-2 rounded-lg relative focus-within:ring-2 focus-within:ring-white transition hover:scale-105 duration-300"
      >
        <select
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          className="w-full bg-transparent text-primary appearance-none focus:outline-none text-sm"
        >
          <option value="">Kayıt Nedeni</option>
          <option>Bilgi Almak</option>
          <option>Ön Kayıt</option>
          <option>Kesin Kayıt</option>
          <option>Diğer</option>
        </select>
        <ArrowDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary pointer-events-none" />
      </motion.div>

      <motion.div
        variants={fadeInUp(0.6)}
        className="relative bg-primary/15 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-white transition hover:scale-105 duration-300"
      >
        <input
          type="text"
          name="course"
          placeholder="Eğitim Ara"
          value={formData.course}
          onChange={handleCourseChange}
          className="w-full bg-transparent placeholder-primary/70 text-primary focus:outline-none text-sm"
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border rounded-lg mt-1 max-h-40 overflow-y-auto shadow-md z-10">
            {suggestions.map((course) => (
              <li
                key={course.id}
                className="p-2 hover:bg-primary/10 cursor-pointer text-sm"
                onClick={() => selectCourse(course.egitimAdi)}
              >
                {course.egitimAdi}
              </li>
            ))}
          </ul>
        )}
      </motion.div>

      <motion.div
        variants={fadeInUp(0.7)}
        className="bg-primary/15 px-4 py-2 rounded-lg focus-within:ring-2 focus-within:ring-white transition hover:scale-105 duration-300"
      >
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Mesajınız"
          rows={3}
          className="w-full bg-transparent placeholder-primary/70 text-primary focus:outline-none resize-none text-sm"
        />
      </motion.div>

      <motion.div variants={fadeInUp(0.8)} className="flex justify-center">
        <ReCAPTCHA
          sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
          onChange={onCaptchaChange}
        />
      </motion.div>

      <motion.button
        variants={fadeInUp(0.9)}
        type="submit"
        disabled={loading}
        className="w-full bg-primary/15 text-primary font-semibold px-5 py-2 rounded-lg hover:bg-primary hover:text-white transition text-sm cursor-pointer hover:scale-105 duration-300"
      >
        {loading ? "Gönderiliyor..." : "Gönder"}
      </motion.button>

      {message && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center text-sm mt-2 ${
            message.includes("başarıyla") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </motion.p>
      )}
    </motion.form>
  );
}
