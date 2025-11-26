import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgVideo from "../assets/login-bg.mp4";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();

    localStorage.setItem("user", JSON.stringify(form));
    alert("Registration successful!");
    navigate("/");
  }

  return (
     <div className="fixed inset-0 overflow-hidden">

    {/* ✅ Background Video */}
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute top-0 left-0 w-full h-full object-cover"
    >
      <source src={bgVideo} type="video/mp4" />
    </video>
<div className="relative z-10 flex items-center justify-center w-full h-full">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-xl w-96 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-3 border rounded-lg"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 border rounded-lg"
          value={form.email}
          onChange={handleChange}
          required
        />

        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 cursor-pointer">
          Create Account
        </button>

        <p className="text-sm text-center flex justify-center gap-1">
          Already have an account?
          <div className="hover:scale-105">
          <Link to="/" className="text-blue-600 font-semibold">
            Login
          </Link></div>
        </p>
      </form>
    </div></div>
  );
}
