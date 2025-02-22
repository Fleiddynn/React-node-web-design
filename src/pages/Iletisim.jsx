import ContactForm from "./../components/ContactForm.jsx";
import ContactInfo from "./../components/ContactInfo.jsx";

const Contact = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center gap-30 mt-6">
      <ContactForm />
      <ContactInfo />
    </div>
  );
};

export default Contact;
