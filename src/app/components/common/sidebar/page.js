"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FiActivity, FiAlertCircle, FiHome } from "react-icons/fi";
import Link from "next/link";
import { useTranslation } from "react-i18next"; // Import useTranslation

const CustomSidebar = ({ userRole, toggle, pathname }) => {
  const [activeItem, setActiveItem] = useState(null);
  const { t } = useTranslation(); // Get translation function

  useEffect(() => {
    console.log(pathname);
    setActiveItem(pathname);
  }, [pathname]);

  const handleMenuItemClick = (link) => {
    setActiveItem(link);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        collapsed={toggle}
        transitionDuration={500}
        backgroundColor={`rgba(255, 255, 255,0.9)`}
      >
        {userRole === "employee" && (
          <Menu
            menuItemStyles={{
              button: ({ level, active }) => ({
                color: active ? "#03a580" : "#4b5563",
                fontWeight: active ? "500" : "300",
              }),
            }}
          >
            <MenuItem
              icon={<FiHome />}
              active={activeItem === "/user/dashboard"}
              onClick={() => handleMenuItemClick("/user/dashboard")}
              component={<Link href="/user/dashboard" />}
            >
              {t("dashboard")}
            </MenuItem>
            <MenuItem
              icon={<FiActivity />}
              active={activeItem === "/generate-report"}
              onClick={() => handleMenuItemClick("/generate-report")}
              component={<Link href="/generate-report" />}
            >
              {t("generateReport")}
            </MenuItem>
            <MenuItem
              icon={<FiAlertCircle />}
              active={activeItem === "/user/payment"}
              onClick={() => handleMenuItemClick("/user/payment")}
              component={<Link href="/user/payment" />}
            >
              {t("payment")}
            </MenuItem>
            <MenuItem
              icon={<FiHome />}
              active={activeItem === "/user/report-history"}
              onClick={() => handleMenuItemClick("/user/report-history")}
              component={<Link href="/user/report-history" />}
            >
              {t("history")}
            </MenuItem>
          </Menu>
        )}
        {userRole === "admin" && (
          <Menu
            menuItemStyles={{
              button: ({ level, active }) => ({
                color: active ? "#03a580" : "#4b5563",
                fontWeight: active ? "500" : "300",
              }),
            }}
          >
            <MenuItem
              icon={<FiHome />}
              active={activeItem === "/admin/dashboard"}
              onClick={() => handleMenuItemClick("/admin/dashboard")}
              component={<Link href="/admin/dashboard" />}
            >
              {t("dashboard")}
            </MenuItem>
            <MenuItem
              icon={<FiAlertCircle />}
              active={activeItem === "/admin/users"}
              onClick={() => handleMenuItemClick("/admin/users")}
              component={<Link href="/admin/users" />}
            >
              {t("users")}
            </MenuItem>
            <MenuItem
              icon={<FiHome />}
              active={activeItem === "/admin/blogs"}
              onClick={() => handleMenuItemClick("/admin/blogs")}
              component={<Link href="/admin/blogs" />}
            >
              {t("blogs")}
            </MenuItem>
          </Menu>
        )}
      </Sidebar>
    </div>
  );
};

export default CustomSidebar;
