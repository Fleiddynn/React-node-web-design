export default function CourseCard({ course }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-gray-300/50 overflow-hidden hover:scale-105 transition ease-in-out duration-300 delay-25">
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No Image</span>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">
          {course.description}
        </p>
        <div className="mt-4 flex items-center gap-2 text-sm">
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
            7hr 24m
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md capitalize">
            {course.category}
          </span>
        </div>
      </div>
    </div>
  );
}
