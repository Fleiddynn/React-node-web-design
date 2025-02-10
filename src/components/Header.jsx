import React from "react";
import logo from "./../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import NavButton from "./NavButton.jsx";
import ContactItem from "./ContactItem.jsx";
import { navLinks } from "../data/navLinks.jsx";
import Socials from "./SocialMediaIcons.jsx";

const Header = () => {
  return (
    <header className="flex flex-col sticky top-0 z-50 mx-80">
      <div className="flex flex-row items-center w-full justify-between  border-b-1 border-b-zinc-200 py-3 ">
        <Link to="/">
          <img src={logo} className="h-20"></img>
        </Link>
        <div>
          <div className="flex flex-row items-center flex-wrap gap-8">
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
        </div>
      </div>
      <div className="flex flex row items-center">
        <nav className="py-3">
          <ul className="flex flex-row gap-15">
            {navLinks.map((link, index) => (
              <NavButton to={link.to} key={index}>
                {link.label}
              </NavButton>
            ))}
          </ul>
        </nav>
        <ul className="flex flex-row gap-2 ml-auto">
          <Socials />
        </ul>
      </div>
    </header>
  );
};

export default Header;
