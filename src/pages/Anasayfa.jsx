import React from "react";
import Hero from "./../components/Hero.jsx";
import PopularCourses from "./../components/PopularCourses.jsx";
import UpcomingEvents from "./../components/UpcomingEvents.jsx";
import WhyUs from "./../components/WhyUs.jsx";
import Gallery from "./../components/Gallery.jsx";
import Footer from "./../components/Footer.jsx";

const Anasayfa = () => {
  return (
    <div className="font-poppins">
      <Hero />
      <PopularCourses />
      <UpcomingEvents />
      <WhyUs />
      <Gallery />
      <Footer />
    </div>
  );
};

export default Anasayfa;
