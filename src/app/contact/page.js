// import Breadcrumb from "../components/common/breadCrumb/page";
import Image from "next/image";
import Footer from "../components/common/footer/page";
import Header from "../components/common/header/page";
import ContactForm from "../components/contactPage/contactForm/page";


const Contact = () => {
  return (
    <div>
      <Header/>

      {/* <Breadcrumb pageName="Contact Us" pageLink="/contact" /> */}
      <div className="md:flex items-center">
        <div className="md:w-1/2 w-full">
          <Image className="w-full lg:h-[550px] h-full" src="/images/contacts.jpg" width={1000} height={1000} />
        </div>
        <div className="md:w-1/2 w-full">
          <ContactForm />
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Contact;
