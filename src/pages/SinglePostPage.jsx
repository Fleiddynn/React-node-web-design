import CoursePageHero from "../components/CoursePageHero.jsx";
import CourseCalendar from "./../components/CourseCalendar.jsx";
import CourseMethod from "./../components/CourseMethod.jsx";
import CourseBenefits from "./../components/CourseBenefits.jsx";
import CertificationAndBenefits from "./../components/CertificationAndBenefits.jsx";

const SinglePostPage = () => {
  return (
    <section>
      <CoursePageHero />
      <CourseCalendar />
      <div className="flex flex-col lg:flex-row gap-8 mt-12 px-4">
        <div className="w-full lg:w-1/2">
          <CourseMethod />
        </div>
        <div className="w-full lg:w-1/2">
          <CourseBenefits />
        </div>
      </div>
      <CertificationAndBenefits />
    </section>
  );
};

export default SinglePostPage;
