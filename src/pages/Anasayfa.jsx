import React from "react";
import Hero from "./../components/Hero.jsx";
import PopularCourses from "./../components/PopularCourses.jsx";
import UpcomingEvents from "./../components/UpcomingEvents.jsx";
import WhyUs from "./../components/WhyUs.jsx";
import Gallery from "./../components/Gallery.jsx";
import Footer from "./../components/Footer.jsx";
import SmallForm from "./../components/SmallForm.jsx";
import Perks from "./../components/Perks.jsx";

const Anasayfa = () => {
  return (
    <div className="font-poppins">
      <Hero />
      <PopularCourses />
      <Perks />
      <UpcomingEvents />
      <WhyUs />
      <Gallery />
      <SmallForm />
      <Footer />
    </div>
  );
};

export default Anasayfa;
