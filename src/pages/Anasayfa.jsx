import Hero from "./../components/Hero.jsx";
import PopularCourses from "./../components/PopularCourses.jsx";
import UpcomingEvents from "./../components/UpcomingEvents.jsx";
import WhyUs from "./../components/WhyUs.jsx";
import Gallery from "./../components/Gallery.jsx";
import SmallForm from "./../components/SmallForm.jsx";
import Perks from "./../components/Perks.jsx";
import Testimonials from "./../components/Testimonials.jsx";

const Anasayfa = () => {
  return (
    <main className="font-poppins">
      <Hero />
      <PopularCourses />
      <Perks />
      <UpcomingEvents />
      <Testimonials />
      <WhyUs />
      <Gallery />
      <SmallForm />
    </main>
  );
};

export default Anasayfa;
