"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({});

  const fetchProfile = async () => {
    const { data } = await axios.get('http://localhost:5000/api/profile');
    setProfile(data);
    setForm(data); // Prefill the form with existing profile data
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put('http://localhost:5000/api/profile', form,{
        headers: {
          'x-auth-token': token, // Send token in header
          'Content-Type': 'application/json', // Ensure content type is set
        }
      });
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">My Profile</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          className="border p-2 mb-2 w-full"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
        <input
          type="text"
          placeholder="Last Name"
          className="border p-2 mb-2 w-full"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-2 mb-2 w-full"
          value={form.password || ''}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="bg-blue-500 text-white p-2">Update Profile</button>
      </form>
    </div>
  );
}
