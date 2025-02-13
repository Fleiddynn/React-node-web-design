import React from "react";
import Hero from "./../components/Hero.jsx";
import PopularCourses from "./../components/PopularCourses.jsx";
import UpcomingEvents from "./../components/UpcomingEvents.jsx";

const Anasayfa = () => {
  return (
    <div className="font-poppins">
      <Hero />
      <PopularCourses />
      <UpcomingEvents />
    </div>
  );
};

export default Anasayfa;
