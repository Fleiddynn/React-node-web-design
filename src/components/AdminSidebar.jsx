import { React, useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem.jsx";

const AdminSidebar = ({ activeMenu, setActiveMenu }) => {
  const menuItems = ["Genel Bakış", "Eğitimler", "Site İçeriği"];

  return (
    <div className="flex flex-col p-5 bg-gray-200 w-72 rounded-3xl shadow-xl shadow-gray-500/50">
      <div className="text-head text-2xl mb-2">
        Dış Ticaret Platformu Admin Paneli
      </div>
      <div className="h-0.5 bg-gray-300 mb-4" />
      <div className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <MenuItem
            key={item}
            label={item}
            isActive={activeMenu === item}
            onClick={() => setActiveMenu(item)}
          />
        ))}
      </div>
      <div className="h-0.5 bg-gray-300 mb-4" />
      <Link
        className="cursor-pointer text-gray-800 text-lg rounded-xl pl-8 py-2
          hover:bg-gray-100 hover:text-gray-600"
        to={"/"}
      >
        Siteye Dön
      </Link>
    </div>
  );
};

export default AdminSidebar;
