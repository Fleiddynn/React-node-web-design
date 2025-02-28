import * as icons from "react-icons/fa";
import socials from "./../data/socials.json";
import PropTypes from "prop-types";

const SocialMediaIcons = ({ showLabels = false }) => {
  return (
    <>
      {socials.map((social, index) => {
        const IconComponent = icons[social.icon];
        return (
          <div key={index} className="flex flex-row gap-2 items-center">
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <span className="text-secondary hover:scale-150 transition duration-300 ease-in-out">
                <IconComponent size={24} />
              </span>
              {showLabels && (
                <span className="text-sm font-medium text-gray-700">
                  {social.name}
                </span>
              )}
            </a>
          </div>
        );
      })}
    </>
  );
};

SocialMediaIcons.propTypes = {
  showLabels: PropTypes.bool,
};

SocialMediaIcons.defaultProps = {
  showLabels: false,
};

export default SocialMediaIcons;
