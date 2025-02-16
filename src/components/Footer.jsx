import React from "react";
import logo from "./../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { PhoneIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import ContactItem from "./ContactItem.jsx";
import { navLinks } from "../data/navLinks.jsx";
import Socials from "./SocialMediaIcons.jsx";

const Footer = () => {
  return (
    <footer className="p-8">
      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link to="/">
            <img src={logo} className="h-16 sm:h-20 max-w-full" alt="Logo" />
          </Link>
          <p className="text-muted-foreground text-center md:text-left max-w-[300px] text-sm">
            Dış Ticaret Platformu, iş hayatı profesyonelleri ve işletmelerin
            gelişen dünya pazarlarında başarılı, etkin ve verimli faaliyet
            göstermelerine destek vermek amacıyla dış ticaretin Eğitim ve
            Danışmanlık Hizmetleri alanlarında faaliyet göstermekte, deneyimli
            ve uzman kadrosuyla hizmet vermektedir.
          </p>
        </div>
        <div className="space-y-2">
          <ContactItem
            icon={EnvelopeIcon}
            text="iletisim@disticaretplatformu.com"
            label="E-Mail"
          />
          <ContactItem icon={PhoneIcon} text="+90 532 574 64 08" label="Tel" />
        </div>
        <div>
          <h2 className="font-semibold text-center md:text-left mb-3">
            Sayfalar
          </h2>
          <ul className="space-y-1 flex flex-col text-primary">
            {navLinks.map((link, index) => (
              <Link
                to={link.to}
                key={index}
                className="text-center md:text-left"
              >
                {link.label}
              </Link>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold text-center md:text-left mb-3">
            Sosyal Medya
          </h2>
          <Socials className="text-primary" />
        </div>
      </div>
      <div className="border-t border-border mt-4 pt-4 text-center text-muted-foreground">
        © 2025 Dış Ticaret Platformu - Tüm hakları saklıdır
      </div>
    </footer>
  );
};

export default Footer;
