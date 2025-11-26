import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bgVideo from "../assets/login-bg.mp4";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: ""
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      alert("No user found. Please register first.");
      return;
    }

    const user = JSON.parse(storedUser);

    if (user.username === form.username && user.email === form.email) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      alert("Invalid Username or Email");
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">

      {/*video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <form
          onSubmit={handleLogin}
          className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-96 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

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

          <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Login
          </button>

          <p className="text-sm text-center flex justify-center gap-1">
            Don't have an account?
            <div className="hover:scale-105">
            <Link to="/register" className="text-blue-600 font-semibold ">
              Register
            </Link></div>
          </p>
        </form>
      </div>
    </div>
  );
}
