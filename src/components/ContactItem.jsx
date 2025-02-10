import React from "react";

const ContactItem = ({ icon: Icon, text, label }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Icon className="h-7 text-primary text-sm" />
      <div className="flex justify-start flex-col font-poppins text-sm">
        <p className=" font-medium">{label}</p>
        <p className="font-light">{text}</p>
      </div>
    </div>
  );
};

export default ContactItem;
