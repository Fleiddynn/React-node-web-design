import React from "react";
import { LightBulbIcon, EyeIcon } from "@heroicons/react/24/solid";

const MissionAndVision = () => {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-8">
        Misyonumuz &amp; Vizyonumuz
      </h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex flex-col items-center text-center p-4">
          <div className="w-24 h-24 flex items-center justify-center bg-primary text-white rounded-full mb-4">
            <LightBulbIcon className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div className="md:w-1/2 flex flex-col items-center text-center p-4">
          <div className="w-24 h-24 flex items-center justify-center bg-primary text-white rounded-full mb-4">
            <EyeIcon className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </section>
  );
};

export default MissionAndVision;
