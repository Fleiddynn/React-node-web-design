import React from "react";

const Founder = () => {
  return (
    <section className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8">
      <div className="md:w-1/3 flex justify-center">
        <img
          src="https://placehold.co/200x200"
          alt="Recep Heptaş"
          className="rounded-full w-48 h-48 object-cover border-4 border-primary"
        />
      </div>
      <div className="md:w-2/3 text-center md:text-left">
        <h3 className="text-2xl font-semibold text-primary">Recep Heptaş</h3>
        <p className="text-lg text-gray-700">Kurucu &amp; CEO</p>
        <p className="text-gray-600 mt-4">
          20+ Yıllık tecrübesiyle Dış Ticaret Platformunu ayakta tutan isim. En
          iyi eğitmenimiz. Parti kursada oy versek. Ornare nullam varius finibus
          feugiat sed bibendum senectus. Quis vivamus ridiculus lacus posuere
          leo blandit ad dis. Laoreet dictumst neque purus tempus eget elit est
          enim.
        </p>
      </div>
    </section>
  );
};

export default Founder;
