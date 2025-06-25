import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import CoursePageHero from "../components/CoursePageHero.jsx";
import CourseCalendar from "./../components/CourseCalendar.jsx";
import CourseMethod from "./../components/CourseMethod.jsx";
import CourseBenefits from "./../components/CourseBenefits.jsx";
import CertificationAndBenefits from "./../components/CertificationAndBenefits.jsx";
import CourseProgram from "./../components/CourseProgram.jsx";
import SmallForm from "./../components/SmallForm.jsx";

const SinglePostPage = () => {
  const { id } = useParams();
  const [egitim, setEgitim] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(true);
  const [hata, setHata] = useState(null);

  useEffect(() => {
    const fetchEgitimDetay = async () => {
      try {
        setYukleniyor(true);
        const response = await axios.get(
          `http://localhost:5000/egitimler/${id}`
        );
        setEgitim(response.data);
        console.log("Tekil Eğitim Verisi:", response.data);
      } catch (error) {
        console.error("Eğitim detayı çekilirken hata oluştu:", error);
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 404) {
            setHata("Eğitim bulunamadı.");
          } else {
            setHata(
              `Eğitim detaylarını yüklerken bir sorun oluştu: ${
                error.response ? error.response.status : error.message
              }`
            );
          }
        } else {
          setHata("Eğitim detaylarını yüklerken bir sorun oluştu.");
        }
      } finally {
        setYukleniyor(false);
      }
    };

    if (id) {
      fetchEgitimDetay();
    }
  }, [id]);

  if (yukleniyor) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Eğitim yükleniyor...
      </div>
    );
  }

  if (hata) {
    return (
      <div className="flex justify-center items-center h-screen text-xl text-red-600">
        {hata}
      </div>
    );
  }

  if (!egitim) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Eğitim detayı bulunamadı.
      </div>
    );
  }

  return (
    <section>
      <CoursePageHero
        egitimAdi={egitim.egitimAdi}
        egitimAciklamasi={egitim.egitimAciklamasi}
        resimYolu={egitim.resimYolu}
        fiyat={egitim.fiyat}
        onlineFiyat={egitim.onlineFiyat}
        egitimSuresi={egitim.egitimSuresi}
        egitimYeri={egitim.egitimYeri}
        kategori={egitim.kategori}
      />
      <CourseCalendar egitimTakvimid={egitim.egitimTakvimid} />
      <div className="flex flex-col lg:flex-row gap-8 mt-12 px-4">
        <div className="w-full lg:w-1/2">
          <CourseMethod />
        </div>
        <div className="w-full lg:w-1/2">
          <CourseBenefits />
        </div>
      </div>
      <CertificationAndBenefits />
      <CourseProgram egitimProgramid={egitim.egitimProgramid} />
      <SmallForm />
    </section>
  );
};

export default SinglePostPage;
