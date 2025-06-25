const MiniCourseCalendar = ({ program, onSelect, isSelected }) => {
  const programTypes = [];
  if (
    program.haftasonu_tarih ||
    program.haftasonu_gunler ||
    program.haftasonu_saatler ||
    program.haftasonu_sure ||
    program.haftasonu_yer ||
    program.haftasonu_ucret
  ) {
    programTypes.push({ type: "Haftasonu", prefix: "haftasonu" });
  }
  if (
    program.haftaici_tarih ||
    program.haftaici_gunler ||
    program.haftaici_saatler ||
    program.haftaici_sure ||
    program.haftaici_yer ||
    program.haftaici_ucret
  ) {
    programTypes.push({ type: "Haftaici", prefix: "haftaici" });
  }
  if (
    program.online_tarih ||
    program.online_gunler ||
    program.online_saatler ||
    program.online_sure ||
    program.online_yer ||
    program.online_ucret
  ) {
    programTypes.push({ type: "Online", prefix: "online" });
  }

  const rowsData = [
    { label: "Tarih", keySuffix: "tarih" },
    { label: "Günler", keySuffix: "gunler" },
    { label: "Saatler", keySuffix: "saatler" },
    { label: "Süre", keySuffix: "sure" },
    { label: "Yer", keySuffix: "yer" },
    { label: "Ücret", keySuffix: "ucret" },
  ];

  return (
    <div
      onClick={() => onSelect(program)}
      className={`border rounded-md cursor-pointer transition duration-200 ease-in-out overflow-hidden ${
        isSelected
          ? "bg-secondary-light border-secondary-darker ring-2 ring-secondary-darker"
          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
      }`}
    >
      <h4 className="font-bold p-3 bg-gray-100 text-head text-base">
        Tablo #{program.id}
      </h4>
      <table className="min-w-full border-collapse bg-white">
        <thead>
          <tr>
            <th className="p-2 text-left bg-gray-200 text-gray-700 text-xs sm:text-sm"></th>
            {programTypes.map((type, index) => (
              <th
                key={index}
                className="p-2 text-center bg-primary text-white border-x border-primary-darker font-bold text-xs sm:text-sm"
              >
                {type.type}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowsData.map((row, rowIndex) => (
            <tr
              key={row.keySuffix}
              className="hover:bg-primary-light transition-colors border-t border-gray-100"
            >
              <td className="p-2 font-semibold bg-gray-50 text-head text-xs sm:text-sm">
                {row.label}
              </td>
              {programTypes.map((type, colIndex) => (
                <td
                  key={`${type.prefix}-${row.keySuffix}`}
                  className={`p-2 text-center border-x border-gray-200 text-gray-700 text-xs sm:text-sm ${
                    row.keySuffix === "ucret" ? "font-bold text-primary" : ""
                  }`}
                >
                  {program[`${type.prefix}_${row.keySuffix}`] || "-"}
                  {row.keySuffix === "ucret" &&
                  program[`${type.prefix}_${row.keySuffix}`]
                    ? " TL"
                    : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MiniCourseCalendar;
