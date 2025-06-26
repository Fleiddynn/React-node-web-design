import CourseCard from "./CourseCard";
import PropTypes from "prop-types";

export default function CourseList({ selected, courses }) {
  const MAX_COURSES = 6;

  const filteredCourses =
    selected === "all"
      ? courses.slice(0, MAX_COURSES)
      : courses
          .filter((course) => {
            if (!course.kategori) {
              return false;
            }
            const courseCategories = course.kategori
              .split(",")
              .map((cat) => cat.trim());

            return courseCategories.includes(selected);
          })
          .slice(0, MAX_COURSES);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))
      ) : (
        <p className="text-gray-500">Bu kategori için eğitim bulunamadı.</p>
      )}
    </div>
  );
}

CourseList.propTypes = {
  selected: PropTypes.string.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      kategori: PropTypes.string,
    })
  ).isRequired,
};
