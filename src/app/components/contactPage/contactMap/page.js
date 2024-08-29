import React from "react";

const ContactMap = () => {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14512.186107321102!2d-0.127758!3d51.507351!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761b1e5e5807d9%3A0x5c22f0a7eae69b7b!2sBuckingham%20Palace!5e0!3m2!1sen!2sus!4v1605606546443!5m2!1sen!2sus";

  return (
    <div className="map-container w-full h-full">
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ border: 0 }}
        allowFullScreen=""
        aria-hidden="false"
        tabIndex="0"
        title="Google Map"
      ></iframe>
    </div>
  );
};

export default ContactMap;
