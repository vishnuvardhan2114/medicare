"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from 'next/link';

export default function Auth() {
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "https://localhost:5000/api/auth/login"
        : "https://localhost:5000/api/auth/register";
      const { data } = await axios.post(url, form);

      if (isLogin) {
        if (data.token) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          router.push("/");
        }
      } else {
        toast.success("You are registered successfully! You can login now.");
        setTimeout(() => {
          setIsLogin(true);
        }, 1000);
      }
    } catch (error) {
      console.error(error);
      if (error.response?.status === 401) {
        toast.error("Invalid credentials. Please check your username and password.");
      } else if (error.response?.status === 404) {
        toast.error("User not found. Please register.");
        setTimeout(() => router.push("/register"), 2000);
      } else {
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 px-4 py-6">
      <header className="flex items-center justify-center sm:justify-start mb-6">
        <img
          src="https://marketplace.canva.com/EAFn3gKy0PI/2/0/1600w/canva-blue-red-white-square-badge-simple-medical-clinic-logo-cLqojTt2k3A.jpg" // Replace with the path to your logo
          alt="Logo"
          className="h-12 sm:h-16"
        />
      </header>
      
      <div className="flex-grow flex items-center justify-center">
        <div className="bg-white bg-opacity-80 shadow-lg rounded-lg p-6 sm:p-8 max-w-md w-full mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            {isLogin ? "Login" : "Register"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                placeholder="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                required
              />
            </div>
            <div>
              <input
                type="password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>

            {!isLogin && (
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Sales Executive">Sales Executive</option>
                </select>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                {isLogin ? "Login" : "Register"}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <button
              type="button"
              className="text-blue-500 hover:underline font-semibold"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create an Account" : "Login"}
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-white bg-opacity-80 py-4 mt-6">
        <div className="container mx-auto text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <Link href="/about" className="text-blue-600 hover:underline">About</Link>
            <Link href="/support" className="text-blue-600 hover:underline">Support</Link>
            <Link href="/contact" className="text-blue-600 hover:underline">Contact Us</Link>
          </div>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Home
          </button>
        </div>
      </footer>

      <ToastContainer />
    </div>
  );
}
