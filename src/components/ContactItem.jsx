import React from "react";

const ContactItem = ({ icon: Icon, text }) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Icon className="h-10 text-primary" />
      <p className="font-poppins">{text}</p>
    </div>
  );
};

export default ContactItem;
