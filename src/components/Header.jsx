import React from "react";
import logo from "./../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import NavButton from "./NavButton.jsx";
import ContactItem from "./ContactItem.jsx";
import { navLinks } from "../data/navLinks.jsx";

const Header = () => {
  return (
    <header className="flex flex-col sticky top-0 z-50 mx-70">
      <div className="flex flex-row items-center w-full justify-between  border-b-1 border-b-zinc-200 py-3 ">
        <Link to="/">
          <img src={logo} className="h-20"></img>
        </Link>
        <div>
          <div className="flex flex-row items-center flex-wrap gap-8">
            <ContactItem
              icon={EnvelopeIcon}
              text="iletisim@disticaretplatformu.com"
            />
            <ContactItem icon={PhoneIcon} text="+90 532 574 64 08" />
          </div>
        </div>
      </div>
      <nav className="py-3 font-poppins font-medium text-xl">
        <ul className="flex flex-row gap-3">
          {navLinks.map((link, index) => (
            <NavButton to={link.to} key={index}>
              {link.label}
            </NavButton>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
