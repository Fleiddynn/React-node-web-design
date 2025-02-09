import React from "react";
import { Link } from "react-router-dom";

const Hata404 = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1>404 - Sayfa Bulunamadı</h1>
      <p>Aradaığınız sayfa mevcut değil ya da taşınmış olabilir.</p>
      <Link to="/">Anasayfa'ya Dön</Link>
    </div>
  );
};

export default Hata404;
