"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CallIcon from '@mui/icons-material/Call';
import InfoIcon from '@mui/icons-material/Info';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import MenuIcon from '@mui/icons-material/Menu';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Check login status and role from localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setDropdownOpen(false); // Close dropdown after logout
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-sans relative bg-[url('https://www.systemc.com/images/uploads/img-37-2345.webp')] bg-blend-screen bg-repeat-x bg-opacity-40 ">

      <header className="row-start-1 flex justify-between items-center w-full">
        <div className="flex justify-center items-center">
          <img
            src="https://www.systemc.com/images/uploads/img-31-2495.webp"
            className="bg-opacity-80" 
            alt="Pharmacy Management Logo"
            width={120}
            height={50}
          />
        </div>
        <div className="flex gap-4 items-center">
          {isLoggedIn && (
            <div className="relative">
              <img
                src="https://truckomat.com/wp-content/uploads/2019/06/avatar-960_720-e1562935069333.png" // Placeholder profile image
                alt="Profile"
                className="rounded-full cursor-pointer"
                width={60}
                height={60}
                onClick={handleProfileClick}
              />
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <div className="p-4">
                    {/* <Link
                      href="/profile"
                      className="block text-sm font-medium text-gray-900 hover:bg-gray-100 p-2 rounded"
                    >
                      Edit Profile
                    </Link> */}
                    <button
                      onClick={handleLogout}
                      className="w-full mt-2 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          {!isLoggedIn && (
            <Link
              href="/auth"
              className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white px-6 py-2 text-sm sm:text-base hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Welcome to the Pharmacy Management System
        </h1>
        <p className="text-lg text-center sm:text-left">
          Manage your inventory, orders, and sales executives with ease.
        </p>

        {isLoggedIn && (
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            {role === "Store Manager" && (
              <Link
                href="/manager"
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                <DashboardIcon width={20} height={20} />
                Manager Dashboard
              </Link>
            )}
            {role === "Sales Executive"  && (
              <Link
                href="/executive"
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-green-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                <LocalHospitalIcon width={20} height={20} />
                Sales Executive Dashboard
              </Link>
            )}
            {role === "Store Manager"  && (
              <Link
                href="/manager/sales"
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-green-500 text-white gap-2 hover:bg-green-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
              >
                <LocalHospitalIcon width={20} height={20} />
                Add Sales Executive 
              </Link>
            )}
          </div>
        )}
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          href="/contact"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <CallIcon height={16} width={16} />
          Contact Us
        </Link>
        <Link
          href="/about"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <InfoIcon height={16} width={16} />
          About Us
        </Link>
        <Link
          href="/support"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <PsychologyAltIcon height={16} width={16} />
          Support
        </Link>
      </footer>
    </div>
  );
}
