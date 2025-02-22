import React from "react";
import * as icons from "react-icons/fa";
import socials from "./../data/socials.json";

const SocialMediaIcons = ({ showLabels = false }) => {
  return (
    <>
      {socials.map((social, index) => {
        const IconComponent = icons[social.icon];
        return (
          <div className="flex flex-row gap-2 items-center">
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:scale-150 transition duration-300 ease-in-out"
            >
              <IconComponent size={24} />
            </a>
            {showLabels && (
              <span className="text-sm font-medium text-gray-700">
                {social.name}
              </span>
            )}
          </div>
        );
      })}
    </>
  );
};

export default SocialMediaIcons;
