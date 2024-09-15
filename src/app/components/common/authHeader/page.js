"use client";
import React from "react";
import CustomSidebar from "../sidebar/page";
import DrawerComponent from "../drawer/drawer";

const Header = ({ userRole, toggle, isOpen, toggleDrawer, pathname }) => {
  return (
    <div>
      <div className="hidden md:block">
        <CustomSidebar
          userRole={userRole}
          toggle={toggle}
          pathname={pathname}
        />
      </div>
      <div className="block bg-red-200 md:hidden">
        <DrawerComponent
          userRole={userRole}
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          pathname={pathname}
        />
      </div>
    </div>
  );
};

export default Header;
