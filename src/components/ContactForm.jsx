import React, { useState } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import courseData from "./../data/courseData.json";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    course: "",
    reason: "",
    message: "",
    captchaVerified: false,
  });
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, course: value });
    if (value) {
      const filteredCourses = courseData.filter((course) =>
        course.title.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredCourses);
    } else {
      setSuggestions([]);
    }
  };

  const selectCourse = (title) => {
    setFormData({ ...formData, course: title });
    setSuggestions([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.captchaVerified) {
      alert("Lütfen captcha doğrulamasını tamamlayın!");
      return;
    }
    alert("Form başarıyla gönderildi!");
  };

  return (
    <motion.form
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-3xl font-bold text-center text-primary">
        Kurs Kayıt ve İletişim Formu
      </h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Adı Soyadı
        </label>
        <motion.input
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          type="text"
          name="fullName"
          placeholder="Ad Soyad yazınız.."
          className="w-full p-3 rounded-lg bg-primary/10 focus:ring-2 focus:ring-primary focus:outline-none hover:scale-105 transition ease-in-out duration-300 delay-25"
          onChange={handleChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-Posta
          </label>
          <motion.input
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            type="email"
            name="email"
            placeholder="abc@xyz.com"
            className="w-full p-3 rounded-lg bg-primary/10 focus:ring-2 focus:ring-primary focus:outline-none hover:scale-105 transition ease-in-out duration-300 delay-25"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefon
          </label>
          <motion.input
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            type="tel"
            name="phone"
            placeholder="5123567890"
            className="w-full p-3 rounded-lg bg-primary/10 focus:ring-2 focus:ring-primary focus:outline-none hover:scale-105 transition ease-in-out duration-300 delay-25"
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Kayıt Nedeni
        </label>
        <motion.select
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          name="reason"
          className="w-full p-3 rounded-lg bg-primary/10 focus:ring-2 focus:ring-primary focus:outline-none hover:scale-105 transition ease-in-out duration-300 delay-25"
          onChange={handleChange}
          required
        >
          <option value="">Bir sebep seçin</option>
          <option value="info">Bilgi Almak</option>
          <option value="pre-register">Ön Kayıt</option>
          <option value="final-register">Kesin Kayıt</option>
          <option value="other">Diğer</option>
        </motion.select>
      </div>
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Eğitim Adı
        </label>
        <motion.input
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          type="text"
          name="course"
          placeholder="Kurs Ara"
          className="w-full p-3 rounded-lg bg-primary/10 focus:ring-2 focus:ring-primary focus:outline-none hover:scale-105 transition ease-in-out duration-300 delay-25"
          onChange={handleCourseChange}
          value={formData.course}
          required
        />
        {suggestions.length > 0 && (
          <ul className="absolute w-full bg-white border rounded-lg mt-1 max-h-40 overflow-y-auto shadow-md z-10">
            {suggestions.map((course) => (
              <li
                key={course.id}
                className="p-3 hover:bg-primary/10 cursor-pointer"
                onClick={() => selectCourse(course.title)}
              >
                {course.title}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Mesajınız
        </label>
        <motion.textarea
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          name="message"
          className="w-full p-3 rounded-lg bg-primary/10 focus:ring-2 focus:ring-primary focus:outline-none resize-none hover:scale-105 transition ease-in-out duration-300 delay-25"
          placeholder="Eğitimle ilgili sorularınızı paylaşın.."
          onChange={handleChange}
          required
        ></motion.textarea>
      </div>
      <div className="flex justify-center">
        <ReCAPTCHA
          sitekey="YOUR_GOOGLE_RECAPTCHA_SITE_KEY"
          onChange={() => setFormData({ ...formData, captchaVerified: true })}
        />
      </div>
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        type="submit"
        className="w-full bg-primary text-white p-3 rounded-lg hover:bg-primary/90 cursor-pointer hover:scale-105 transition ease-in-out duration-300 delay-25"
      >
        Send Message
      </motion.button>
    </motion.form>
  );
};

export default ContactForm;
