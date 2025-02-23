import courseTableData from "./../data/courseTableData.json";

const CourseCalendar = () => {
  const { programs } = courseTableData;

  return (
    <>
      <div className="w-full max-w-4xl mx-auto mb-6">
        <h1 className="text-2xl font-bold text-center text-head">
          PROGRAM DETAYLARI
        </h1>
      </div>

      <div className="w-full max-w-4xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr>
                <th className="p-3 text-left bg-gray-100"></th>
                {programs.map((program, index) => (
                  <th
                    key={index}
                    className="p-3 text-center bg-orange-500 text-white border-x border-orange-400 font-bold"
                  >
                    {program.type}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Tarih", "date"],
                ["Günler", "days"],
                ["Saatler", "hours"],
                ["Süre", "duration"],
                ["Yer", "location"],
                ["Ücret", "price"],
              ].map(([label, key]) => (
                <tr key={key} className="hover:bg-orange-50 transition-colors">
                  <td className="p-3 font-semibold bg-gray-50">{label}</td>
                  {programs.map((program, index) => (
                    <td
                      key={index}
                      className={`p-3 text-center border-x border-gray-200 ${
                        key === "price" ? "font-bold text-orange-500" : ""
                      } ${key === "days" ? "whitespace-pre-line" : ""}`}
                    >
                      {program[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CourseCalendar;
