// import Breadcrumb from "../components/common/breadCrumb/page";
import Footer from "../components/common/footer/page";
import Header from "../components/common/header/page";
import ContactForm from "../components/contactPage/contactForm/page";
import ContactMap from "../components/contactPage/contactMap/page";


const Contact = () => {
  return (
    <div>
      <Header/>

      {/* <Breadcrumb pageName="Contact Us" pageLink="/contact" /> */}
      <div className="md:flex ">
        <div className="md:w-1/2 w-full">
          <ContactMap />
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
