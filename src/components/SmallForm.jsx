import React from "react";
import {
  ArrowRightIcon,
  EnvelopeIcon,
  UserIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/solid";

const SmallForm = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between shadow-lg max-w-6xl mx-auto overflow-hidden mt-5">
      <div className="text-white font-bold text-2xl mb-6 md:mb-0 md:mr-6">
        <p>Join us</p>
        <p>and stay tuned!</p>
        <button className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
          <ArrowRightIcon className="h-5 w-5" /> Join Us
        </button>
      </div>
      <div className="flex flex-col gap-4 w-full md:w-1/2">
        <div className="flex gap-2">
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm w-full">
            <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Name"
              className="flex-1 bg-transparent focus:outline-none"
            />
          </div>
          <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm w-full">
            <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 bg-transparent focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
          <select className="w-full bg-transparent focus:outline-none">
            <option>Class</option>
            <option>Class A</option>
            <option>Class B</option>
          </select>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
          <ChatBubbleOvalLeftIcon className="h-5 w-5 text-gray-400 mr-2" />
          <textarea
            placeholder="Message"
            className="w-full bg-transparent focus:outline-none h-20"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default SmallForm;
