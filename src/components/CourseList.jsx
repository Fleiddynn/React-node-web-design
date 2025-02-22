import CourseCard from "./CourseCard";
import PropTypes from "prop-types";

export default function CourseList({ selected, courses }) {
  const MAX_COURSES = 6;

  const filteredCourses =
    selected === "all"
      ? courses.slice(0, MAX_COURSES)
      : courses
          .filter((course) => course.category === selected)
          .slice(0, MAX_COURSES);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredCourses.length > 0 ? (
        filteredCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))
      ) : (
        <p className="text-gray-500">No courses available for this category.</p>
      )}
    </div>
  );
}

CourseList.propTypes = {
  selected: PropTypes.string.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
};
