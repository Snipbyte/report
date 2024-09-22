// AdminLayout.js
"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Header from "../../common/authHeader/page";
import NavbarAuth from "../../common/authNavbar/page";

const AdminLayout = ({ children }) => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    // Retrieve teamLead status from localStorage

    const handleWindowResize = () => {
      if (window.innerWidth < 850 && window.innerWidth > 766) {
        setToggle(true);
      } else {
        setToggle(false);
      }
    };

    // Add event listener to window resize event.
    window.addEventListener("resize", handleWindowResize);

    // Clean up the event listener on component unmount.
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // for drawer
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  return (
    <>
      <NavbarAuth
        toggleDrawer={toggleDrawer}
        handleToggle={handleToggle}
        isAdmin={true}
      />
      <div style={{ display: "flex" }}>
        <Header
          userRole="admin"
          toggle={toggle}
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          pathname={pathname}
        />
        {/* Additional components and functionalities specific to employee */}
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
