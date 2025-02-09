import React from "react";
import logo from "./../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { PhoneIcon } from "@heroicons/react/24/solid";

const Header = () => {
  return (
    <header className="flex flex-col sticky top-0 z-50 w-full">
      <div className="flex flex-row items-center">
        <Link to="/">
          <img src={logo} className="h-20"></img>
        </Link>
        <PhoneIcon className="h-10 text-primary" />
        <p className="font-poppins">Deneme</p>
      </div>
      <nav>
        <ul className="flex flex-row gap-3">
          <li>
            <Link to="/">Anasayfa</Link>
          </li>
          <li>
            <Link to="/hakkimizda">Hakkımızda</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
