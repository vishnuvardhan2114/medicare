"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Auth() {
  const [form, setForm] = useState({ username: "", password: "", role: "" });
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "http://localhost:5000/api/auth/login"
        : "http://localhost:5000/api/auth/register";
      const { data } = await axios.post(url, form);
      if (data.token) {
        localStorage.setItem("token", data.token);
        if (!isLogin) {
          localStorage.setItem("role", form.role); // Store role during registration
        } else {
          localStorage.setItem("role", data.role); // Store role received from backend on login
        }
        console.log(localStorage);
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 bg-[url('https://media.istockphoto.com/id/1351079314/photo/3d-render-doctor-african-cartoon-character-shows-right-gives-recommendation-clip-art-isolated.jpg?s=612x612&w=0&k=20&c=o0PcnGLkr8CrBp4Z7C3cBonHoEEudcZbAcanrGHaVpw=')] bg-contain">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">{isLogin ? "Login" : "Register"}</h2>
        <input
          type="text"
          className="border p-2 mb-4 w-full"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />
        <input
          type="password"
          className="border p-2 mb-4 w-full"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
        
        {/* Only show the role dropdown for registration */}
        {!isLogin && (
          <select
            className="border p-2 mb-4 w-full"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="">Select Role</option>
            <option value="Store Manager">Store Manager</option>
            <option value="Sales Executive">Sales Executive</option>
          </select>
        )}

        <button className="bg-blue-500 text-white p-2 w-full">
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          type="button"
          className="text-blue-500 mt-4"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an Account" : "Login"}
        </button>
      </form>
    </div>
  );
}
