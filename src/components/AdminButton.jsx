import React from "react";
import { Link } from "react-router-dom";

const AdminButton = ({ label, icon, to }) => {
  return (
    <Link
      to={to}
      className="min-w-30 min-h-30 flex flex-col bg-white rounded-3xl border-head border-2 hover:bg-head/40 hover:border-white cursor-pointer hover:scale-110 transition ease-in-out duration-300 delay-25 justify-center items-center"
    >
      <div>{icon}</div>
      <div>{label}</div>
    </Link>
  );
};

export default AdminButton;
