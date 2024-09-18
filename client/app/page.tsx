"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CallIcon from '@mui/icons-material/Call';
import InfoIcon from '@mui/icons-material/Info';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import ArchiveIcon from '@mui/icons-material/Archive';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
    setDropdownOpen(false);
  };

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="grid grid-rows-[auto_1fr_auto] min-h-screen p-6 sm:p-12 gap-8 bg-[url('https://www.systemc.com/images/uploads/img-37-2345.webp')] bg-blend-overlay bg-cover bg-center">
      {/* Header */}
      <header className="flex justify-between items-center w-full">
        <div className="flex items-center">
          <Link href="/about">
            <img
              src="https://marketplace.canva.com/EAFn3gKy0PI/2/0/1600w/canva-blue-red-white-square-badge-simple-medical-clinic-logo-cLqojTt2k3A.jpg"
              alt="Pharmacy Management Logo"
              className="opacity-90"
              width={60}
              height={50}
            />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="relative">
              <img
                src="https://truckomat.com/wp-content/uploads/2019/06/avatar-960_720-e1562935069333.png"
                alt="Profile"
                className="rounded-full cursor-pointer transition duration-300 hover:opacity-80"
                width={60}
                height={60}
                onClick={handleProfileClick}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                  <div className="p-2">
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth"
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm sm:text-base hover:bg-blue-600 transition shadow-lg"
            >
              Login
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center gap-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-white shadow-sm drop-shadow-md">
          Welcome to the Pharmacy Management System
        </h1>
        <p className="text-lg text-white opacity-90">
          Manage your inventory, orders, and sales executives with ease.
        </p>

        {isLoggedIn && (
          <div className="flex flex-col sm:flex-row gap-4">
            {role === "Store Manager" && (
              <>
                <Link
                  href="/manager"
                  className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded-full text-sm sm:text-base gap-2 hover:bg-blue-600 transition shadow-lg"
                >
                  <DashboardIcon />
                  Manager Dashboard
                </Link>
                <Link
                  href="/manager/sales"
                  className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-full text-sm sm:text-base gap-2 hover:bg-green-600 transition shadow-lg"
                >
                  <LocalHospitalIcon />
                  Add Sales Executive
                </Link>
                <Link
                  href="/executive"
                  className="flex items-center justify-center bg-yellow-500 text-white px-4 py-2 rounded-full text-sm sm:text-base gap-2 hover:bg-yellow-600 transition shadow-lg"
                >
                  <ArchiveIcon />
                  Order Management Dashboard
                </Link>
              </>
            )}
            {role === "Sales Executive" && (
              <Link
                href="/executive"
                className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded-full text-sm sm:text-base gap-2 hover:bg-green-600 transition shadow-lg"
              >
                <LocalHospitalIcon />
                Sales Executive Dashboard
              </Link>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex flex-wrap gap-4 items-center justify-center text-white opacity-90">
        <Link
          href="/contact"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <CallIcon />
          Contact Us
        </Link>
        <Link
          href="/about"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <InfoIcon />
          About Us
        </Link>
        <Link
          href="/support"
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        >
          <PsychologyAltIcon />
          Support
        </Link>
      </footer>
    </div>
  );
}
