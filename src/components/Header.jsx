import { useState, useRef, useEffect } from "react";
import logo from "./../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import {
  PhoneIcon,
  EnvelopeIcon,
  Bars3Icon,
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import NavButton from "./NavButton.jsx";
import ContactItem from "./ContactItem.jsx";
import { navLinks } from "../data/navLinks.jsx";
import Socials from "./SocialMediaIcons.jsx";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesDropdownHovered, setIsCoursesDropdownHovered] =
    useState(false);
  const [isCoursesDropdownOpenMobile, setIsCoursesDropdownOpenMobile] =
    useState(false);
  const dropdownTimeoutRef = useRef(null);
  const mdBreakpoint = 768;

  const [isMobileView, setIsMobileView] = useState(
    window.innerWidth < mdBreakpoint
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < mdBreakpoint);
      setIsCoursesDropdownHovered(false);
      setIsCoursesDropdownOpenMobile(false);
      setIsMenuOpen(false);
      clearTimeout(dropdownTimeoutRef.current);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsCoursesDropdownHovered(false);
    setIsCoursesDropdownOpenMobile(false);
    clearTimeout(dropdownTimeoutRef.current);
  };

  const handleMouseEnter = () => {
    if (!isMobileView) {
      clearTimeout(dropdownTimeoutRef.current);
      setIsCoursesDropdownHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobileView) {
      dropdownTimeoutRef.current = setTimeout(() => {
        setIsCoursesDropdownHovered(false);
      }, 150);
    }
  };

  const links = navLinks.filter((link) => !link.group);
  const courseLinks = navLinks.find((link) => link.group);

  const allCourseChildren = courseLinks ? [...courseLinks.children] : [];

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0, scaleY: 0 },
    visible: {
      opacity: 1,
      scaleY: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.08,
        duration: 0.2,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scaleY: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
        duration: 0.15,
        ease: "easeIn",
      },
    },
  };

  return (
    <header className="flex flex-col sticky top-0 z-50 bg-white shadow-xs">
      <div className="container mx-auto px-3 sm:px-9 lg:px-15">
        <div className="flex flex-row items-center justify-between border-b border-zinc-200 py-3">
          <Link to="/">
            <img src={logo} className="h-16 sm:h-20" alt="Logo" />
          </Link>
          <div className="hidden md:flex md:flex-row items-center gap-8">
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
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-row items-center py-5">
          <nav className={`${isMenuOpen ? "block" : "hidden"} md:block w-full`}>
            <ul className="flex flex-col md:flex-row gap-4 md:gap-8">
              {links.map((link, index) => (
                <NavButton to={link.to} key={index}>
                  {link.label}
                </NavButton>
              ))}
              {courseLinks && (
                <li
                  className="relative font-poppins font-medium tracking-wide text-xl"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <NavLink
                    to="/egitimler"
                    className={({ isActive }) =>
                      `flex items-center text-gray-700 font-poppins font-medium tracking-wide text-xl focus:outline-none 
                      ${
                        isActive
                          ? "border-b-2 border-secondary pb-1"
                          : "border-b-2 border-transparent pb-1"
                      } 
                      ${
                        !isMobileView
                          ? "hover:text-secondary transition-all duration-300 ease-in-out"
                          : ""
                      }`
                    }
                    onClick={(e) => {
                      if (isMobileView) {
                        e.preventDefault();
                        setIsCoursesDropdownOpenMobile((prev) => !prev);
                      } else {
                        setIsCoursesDropdownHovered(false);
                        setIsMenuOpen(false);
                      }
                    }}
                  >
                    {courseLinks.group}
                    <ChevronDownIcon
                      className={`w-4 h-4 ml-1 transform transition-transform 
                        ${
                          (isCoursesDropdownHovered && !isMobileView) ||
                          (isCoursesDropdownOpenMobile && isMobileView)
                            ? "rotate-180"
                            : ""
                        }`}
                    />
                  </NavLink>
                  <AnimatePresence>
                    {((isCoursesDropdownHovered && !isMobileView) ||
                      (isCoursesDropdownOpenMobile && isMobileView)) && (
                      <motion.ul
                        key="courses-dropdown"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className={`bg-white shadow-lg md:rounded-md mt-2 md:w-56 py-2 z-50 origin-top
                          ${
                            !isMobileView
                              ? "md:absolute md:top-full md:left-0"
                              : "relative"
                          }
                        `}
                      >
                        {allCourseChildren.map((subLink, subIndex) => (
                          <motion.li
                            key={subIndex}
                            variants={itemVariants}
                            className={`font-poppins font-medium text-lg ${
                              subIndex > 0
                                ? "border-t border-zinc-200 pt-2 mt-2"
                                : ""
                            }`}
                          >
                            <NavLink
                              to={subLink.to}
                              onClick={() => {
                                setIsCoursesDropdownHovered(false);
                                setIsCoursesDropdownOpenMobile(false);
                                setIsMenuOpen(false);
                              }}
                              className={({ isActive }) =>
                                isActive
                                  ? "block px-4 py-1 text-secondary"
                                  : "block px-4 py-1 hover:text-secondary text-gray-800"
                              }
                            >
                              {subLink.label}
                            </NavLink>
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              )}
            </ul>
          </nav>
          <ul
            className={`${
              isMenuOpen ? "hidden" : "flex"
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
