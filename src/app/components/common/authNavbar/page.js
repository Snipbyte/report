"use client";
import React, { useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { FiBell, FiLogOut } from "react-icons/fi";

const NavbarAuth = ({ handleToggle, toggleDrawer }) => {
  //   const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    // await dispatch(userLogout());
    router.push("/");
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return (
    <div>
      {" "}
      {/* for header  */}
      <header>
        <nav className="bg-desColor  px-4 py-2.5 lg:px-6 ">
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
                className=" border-card block flex items-center rounded border px-4 py-2 text-sm text-white hover:bg-gray-100 hover:text-desColor"
                onClick={handleLogout}
              >
                <FiLogOut className="mx-2" /> Sign out
              </button>
            

              <button
                type="button"
                className="relative mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isDropdownOpen}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Toggle the state on click
              >
                <span className="sr-only">Open user menu</span>
                <div className="text-btgreen bg-lightCard rounded-full p-2">
                  MK
                </div>
              </button>

              <div
                className={`${
                  isDropdownOpen ? "block" : "hidden"
                } absolute right-[10px] top-[35px] z-50  my-4 w-56 list-none divide-y divide-gray-100 rounded bg-white text-base shadow-lg `}
                id="dropdown"
              >
                <div className="px-4 py-3 ">
                  <span className="block text-sm font-semibold text-gray-900 ">
                    Muhammad Kashif
                  </span>
                  <span className="block truncate text-sm font-light text-gray-500 ">
                    email@snipbyte.com
                  </span>
                </div>

                <ul
                  className="py-1 font-light text-gray-500 "
                  aria-labelledby="dropdown"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100 "
                    >
                      Profile
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm hover:bg-gray-100  "
                    >
                      Sign Out
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* end header  */}
    </div>
  );
};

export default NavbarAuth;
