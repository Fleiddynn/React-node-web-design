import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/admin/login", {
        username,
        sifre,
      });

      localStorage.setItem("admin_token", response.data.token);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      setHata(
        err.response?.data?.message || "Giriş başarısız. Sunucuya ulaşılamadı."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Admin Giriş</h2>
        {hata && <p className="text-red-600 text-sm">{hata}</p>}
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Şifre"
          value={sifre}
          onChange={(e) => setSifre(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 cursor-pointer"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
