const MenuItem = ({ label, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer text-gray-800 text-lg rounded-xl pl-8 py-2
          hover:bg-gray-100 hover:text-gray-600
          ${isActive ? "bg-gray-300 text-gray-700 font-semibold" : ""}
        `}
    >
      {label}
    </div>
  );
};

export default MenuItem;
