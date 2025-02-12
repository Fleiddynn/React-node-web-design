import React from "react";
import CourseCard from "./CourseCard";

export default function CourseList({ selected, courses }) {
  const MAX_COURSES = 6;

  const filteredCourses =
    selected === "all"
      ? courses.slice(0, MAX_COURSES)
      : courses
          .filter((course) => course.category === selected)
          .slice(0, MAX_COURSES);

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
