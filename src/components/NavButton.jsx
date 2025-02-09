import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavButton = ({ to, children }) => {
  return (
    <li className="hover:text-secondary transition delay-50 duration-300 ease-in-out">
      <Link to={to}>{children}</Link>
    </li>
  );
};

export default NavButton;
