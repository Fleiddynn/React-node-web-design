import React, { useState } from "react";
import logo from "./../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { PhoneIcon, EnvelopeIcon, Bars3Icon } from "@heroicons/react/24/solid";
import NavButton from "./NavButton.jsx";
import ContactItem from "./ContactItem.jsx";
import { navLinks } from "../data/navLinks.jsx";
import Socials from "./SocialMediaIcons.jsx";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex flex-col sticky top-0 z-50">
      <div className="container mx-auto px-3 sm:px-9 lg:px-15">
        <div className="flex flex-row items-center justify-between border-b border-zinc-200 py-3">
          <Link to="/">
            <img src={logo} className="h-16 sm:h-20" alt="Logo" />
          </Link>
          <div className="md:flex md:flex-row items-center gap-8 flex-col">
            <ContactItem
              icon={EnvelopeIcon}
              text="iletisim@disticaretplatformu.com"
              label="E-Mail"
            />
            <ContactItem
              icon={PhoneIcon}
              text="+90 532 574 64 08"
              label="Tel"
            />
          </div>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-gray-800 focus:outline-none"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-row items-center py-5">
          <nav className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8">
              {navLinks.map((link, index) => (
                <NavButton to={link.to} key={index}>
                  {link.label}
                </NavButton>
              ))}
            </ul>
          </nav>
          <ul
            className={`${
              isMenuOpen ? "hidden" : "block"
            } md:flex flex-row gap-2 ml-auto`}
          >
            <Socials />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
