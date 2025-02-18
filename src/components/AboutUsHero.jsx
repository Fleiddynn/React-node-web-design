import React from "react";

const AboutUsHero = () => {
  return (
    <section className="relative bg-white py-16 px-6 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <h3 className="text-primary font-semibold uppercase">Hakkımızda</h3>
        <h2 className="text-4xl font-bold text-head mb-4">
          Dış Ticaret Platformu
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Convallis vivamus at cras porta nibh velit aliquam eget in faucibus mi
          tristique aliquam ultrices sit cras nascetur in elementum placerat sed
          viverra risus in turpis vitae sed est tincidunt vitae.
        </p>
      </div>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-center items-center gap-8 mt-10">
        <div className="w-72 h-80 bg-gray-300 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://via.placeholder.com/300"
            alt="Placeholder"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-72 h-80 bg-gray-300 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://via.placeholder.com/300"
            alt="Placeholder"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;
