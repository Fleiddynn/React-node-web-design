import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setHata("");

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/login",
        { username, sifre: sifre },
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        navigate("/admin");
      } else {
        setHata(response.data.message || "Giriş başarısız.");
      }
    } catch (err) {
      console.error("Giriş sırasında hata:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setHata(err.response.data.message);
      } else {
        setHata("Giriş yapılamadı. Sunucuya ulaşılamadı veya sunucu hatası.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Admin Girişi
        </h2>
        {hata && (
          <p className="text-red-500 text-xs italic mb-4 text-center">{hata}</p>
        )}
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Kullanıcı Adı:
          </label>
          <input
            type="text"
            id="username"
            placeholder="Kullanıcı Adı"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Şifre:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Şifre"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-orange-500"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-full hover:bg-orange-700 cursor-pointer focus:outline-none focus:shadow-outline transition duration-300 ease-in-out" // Stil düzeltmeleri
          >
            Giriş Yap
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminLogin;
