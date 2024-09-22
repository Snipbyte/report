"use client";
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";

const NavbarAuth = ({ handleToggle, toggleDrawer , isAdmin }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null); // To store user data
  const router = useRouter();

  // Function to fetch user data
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("token", token);
      // if (!token) {
      //   router.push("/login");
      //   return;
      // }

      const response = await axios.get("/api/user/getUser", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUserData(response.data.user); // Store user data in state
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle token expiration or error
      localStorage.removeItem("token");
     if(!isAdmin){
      router.push("/login");
     }
    }
  };

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    router.push("/"); // Redirect to homepage
  };

  return (
    <div>
      {/* Header */}
      <header>
        <nav className="bg-desColor px-4 py-2.5 lg:px-6">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center justify-start">
              <button className="hidden md:block" onClick={handleToggle}>
                <FaBars className="mx-2 text-white" />
              </button>
              <button className="block md:hidden" onClick={toggleDrawer}>
                <FaBars className="mx-2 text-white" />
              </button>

              <span className="mx-2 self-center whitespace-nowrap text-2xl font-semibold text-white">
                Izikemp
              </span>
            </div>

            <div className="flex items-center lg:order-2">
              <button
                href="#"
                className="border-card block flex items-center rounded border px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-desColor"
                onClick={handleLogout}
              >
                <FiLogOut className="mx-2" /> Sign out
              </button>
              {!isAdmin && 
              <>
              <button
                type="button"
                className="relative mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="sr-only">Open user menu</span>
                <div className="text-btgreen bg-lightCard rounded-full p-2">
                  {userData
                    ? userData.firstname[0] + userData.lastname[0]
                    : "MK"}
                </div>
              </button>
        
              <div
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } absolute right-[10px] top-[35px] z-50 my-4 w-56 list-none divide-y divide-gray-100 rounded bg-white text-base shadow-lg`}
                id="dropdown"
              >
                <div className="px-4 py-3">
                  <span className="block text-sm font-semibold text-gray-900">
                    {userData
                      ? `${userData.firstname} ${userData.lastname}`
                      : "Muhammad Kashif"}
                  </span>
                  <span className="block truncate text-sm font-light text-gray-500">
                    {userData ? userData.email : "email@snipbyte.com"}
                  </span>
                </div>

                <ul
                  className="py-1 font-light text-gray-500"
                  aria-labelledby="dropdown"
                >
                 
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
              </>
}
            </div>
          </div>
        </nav>
      </header>
      {/* End Header */}
    </div>
  );
};

export default NavbarAuth;
