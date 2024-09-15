//sidebar
"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import {
  FiAlertCircle,
  FiBell,
  FiCalendar,
  FiClock,
  FiFile,
  FiHome,
  FiList,
  FiPlusCircle,
  FiSettings,
  FiSquare,
  FiUser,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import Link from "next/link";

const CustomSidebar = ({ userRole, toggle, pathname }) => {
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    console.log(pathname);
    setActiveItem(pathname);
  }, [pathname]);

  // Function to handle click event on a menu item
  const handleMenuItemClick = (link) => {
    setActiveItem(link);
  };
  return (
    <div className="flex h-screen">
      <Sidebar
        collapsed={toggle}
        transitionDuration={500}
        onBackdropClick={() => setToggled(false)}
        // image="https://user-images.githubusercontent.com/25878302/144499035-2911184c-76d3-4611-86e7-bc4e8ff84ff5.jpg"
        backgroundColor={`rgba(255, 255, 255,0.9)`}
      >
        {/* for employee  */}

        {userRole === "employee" && (
          <Menu
            menuItemStyles={{
              button: ({ level, active, disabled }) => {
                // only apply styles on first level elements of the tree
                if (!active) {
                  return {
                    color: "#4b5563",
                    fontWeight: "300",
                  };
                } else {
                  return {
                    color: "#03a580",
                    fontWeight: "500",
                  };
                }
              },
            }}
          >
            <MenuItem
              icon={<FiHome />}
              active={activeItem === "/user/dashboard"}
              onClick={() => handleMenuItemClick("/user/dashboard")}
              component={<Link href="/user/dashboard" />}
            >
              {" "}
              Dashboard{" "}
            </MenuItem>

            <MenuItem
              icon={<FiAlertCircle />}
              active={activeItem === "/user/payment"}
              onClick={() => handleMenuItemClick("/user/payment")}
              component={<Link href="/user/payment" />}
            >
              {" "}
              Payment{" "}
            </MenuItem>
            <MenuItem
              icon={<FiHome />}
              active={activeItem === "/user/report-history"}
              onClick={() => handleMenuItemClick("/user/report-history")}
              component={<Link href="/user/report-history" />}
            >
              {" "}
              History{" "}
            </MenuItem>
          </Menu>
        )}
      </Sidebar>
    </div>
  );
};

export default CustomSidebar;
