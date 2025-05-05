"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FiActivity, } from "react-icons/fi";
import { GrPlan, GrUserAdmin } from "react-icons/gr";
import Link from "next/link";
import { useTranslation } from "react-i18next"; // Import useTranslation
import { MdHistory, MdOutlineContentPasteGo, MdOutlineDashboard, MdOutlinePayment, MdOutlinePayments, MdOutlineSettingsSuggest } from "react-icons/md";
import { TbLogs, TbUsersGroup } from "react-icons/tb";
import { PiUserCircleCheckLight } from "react-icons/pi";

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
                color: active ? "#6366f1" : "#111827",
                fontWeight: active ? "700" : "300",
                backgroundColor: active ? "#e0e7ff" : "transparent", 
              }),
            }}
          >
            <MenuItem
              icon={<MdOutlineDashboard />}
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
              component={<Link href="/user/plan" />}
            >
              {t("generateReport")}
            </MenuItem>
            <MenuItem
              icon={<MdOutlinePayments />}
              active={activeItem === "/user/payment"}
              onClick={() => handleMenuItemClick("/user/payment")}
              component={<Link href="/user/payment" />}
            >
              {t("payment")}
            </MenuItem>
            {/* <MenuItem
              icon={<MdHistory />}
              active={activeItem === "/user/report-history"}
              onClick={() => handleMenuItemClick("/user/report-history")}
              component={<Link href="/user/report-history" />}
            >
              {t("history")}
            </MenuItem> */}
            <MenuItem
              icon={<MdOutlineSettingsSuggest />}
              active={activeItem === "/user/update-password"}
              onClick={() => handleMenuItemClick("/user/update-password")}
              component={<Link href="/user/update-password" />}
            >
              {t("updatePassword")}
            </MenuItem>
          </Menu>
        )}
        {userRole === "admin" && (
         <Menu
         menuItemStyles={{
           button: ({ level, active }) => ({
             color: active ? "#6366f1" : "#111827",
             fontWeight: active ? "700" : "300",
             backgroundColor: active ? "#e0e7ff" : "transparent", 
           }),
         }}
       >       
            <MenuItem
              icon={<MdOutlineDashboard />}
              active={activeItem === "/admin/dashboard"}
              onClick={() => handleMenuItemClick("/admin/dashboard")}
              component={<Link href="/admin/dashboard" />}
            >
              {t("dashboard")}
            </MenuItem>
            <MenuItem
              icon={<TbUsersGroup />}
              active={activeItem === "/admin/users"}
              onClick={() => handleMenuItemClick("/admin/users")}
              component={<Link href="/admin/users" />}
            >
              {t("users")}
            </MenuItem>
            <MenuItem
              icon={<TbLogs />}
              active={activeItem === "/admin/blogs"}
              onClick={() => handleMenuItemClick("/admin/blogs")}
              component={<Link href="/admin/blogs" />}
            >
              {t("blogs")}
            </MenuItem>
            <MenuItem
              icon={<GrUserAdmin />}
              active={activeItem === "/admin/admins"}
              onClick={() => handleMenuItemClick("/admin/admins")}
              component={<Link href="/admin/admins" />}
            >
              {t("admins")}
            </MenuItem>
            <MenuItem
              icon={<PiUserCircleCheckLight />}
              active={activeItem === "/admin/subscribed-users"}
              onClick={() => handleMenuItemClick("/admin/subscribed-users")}
              component={<Link href="/admin/subscribed-users" />}
            >
              {t("subscribed")}
            </MenuItem>
            <MenuItem
              icon={<MdOutlineContentPasteGo />}
              active={activeItem === "/admin/content-management"}
              onClick={() => handleMenuItemClick("/admin/content-management")}
              component={<Link href="/admin/content-management" />}
            >
              {t("contentManage")}
            </MenuItem>
            <MenuItem
              icon={<GrPlan />}
              active={activeItem === "/admin/plans"}
              onClick={() => handleMenuItemClick("/admin/plans")}
              component={<Link href="/admin/plans" />}
            >
              {t("plans")}
            </MenuItem>
          </Menu>
        )}
      </Sidebar>
    </div>
  );
};

export default CustomSidebar;
