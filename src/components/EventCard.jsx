import React from "react";
import { ArrowLongRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const EventCard = ({ course }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="space-y-4 cursor-pointer group hover:scale-105 transition ease-in-out duration-300 delay-25 mb-5"
    >
      <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition ease-in-out duration-300 delay-25">
        <div className="flex items-center">
          <img
            src="https://placehold.co/200x100"
            alt="Event Image"
            className="rounded-lg mr-4"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-head group-hover:text-primary">
              {course.title}
            </h3>
            <p className="text-sm text-muted-foreground">
              {course.place} • {course.date}
            </p>
          </div>
          <ArrowLongRightIcon className="text-secondary group-hover:scale-120 h-5 w-5 transition ease-in-out duration-300 delay-25" />
        </div>
      </div>
    </motion.div>
  );
};

export default EventCard;
