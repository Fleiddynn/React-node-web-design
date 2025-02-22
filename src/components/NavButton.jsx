import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const NavButton = ({ to, children }) => {
  return (
    <li className="hover:text-secondary transition delay-15 duration-75 ease-in-out font-poppins font-medium tracking-wide text-xl">
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "border-b-2 border-secondary pb-1 transition-all duration-300 ease-in-out w-[30%]"
            : "border-b-2 border-transparent pb-1 transition-all duration-300 ease-in-out"
        }
      >
        {children}
      </NavLink>
    </li>
  );
};

NavButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default NavButton;
