import React from "react";
import * as icons from "react-icons/fa";
import socials from "./../data/socials.json";

const SocialMediaIcons = () => {
  return (
    <>
      {socials.map((social, index) => {
        const IconComponent = icons[social.icon];
        return (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary hover:scale-150 transition duration-300 ease-in-out"
          >
            <IconComponent size={24} />
          </a>
        );
      })}
    </>
  );
};

export default SocialMediaIcons;
