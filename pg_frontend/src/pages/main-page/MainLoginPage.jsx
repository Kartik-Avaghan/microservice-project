import React, { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MainLoginPage() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:8080/api/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Login failed");
        return response.json();
      })
      .then((data) => {
        const token = data.token;
        const role = data.role; // get role from backend

        localStorage.setItem("token", `Bearer ${token}`);
        localStorage.setItem("role", role);

        if (role === "ROLE_ADMIN") {
          navigate("/admin/dashboard");
        } else if (role === "ROLE_GUEST") {
          navigate("/guest/profile");
        } else {
          alert("Unknown role. Contact admin.");
        }
      })

      // .then((data)=>{
      //   const token = data.token;
      //   localStorage.setItem("token", `Bearer ${token}`);
      //   // localStorage.setItem("tenantId",data.tenantId);
      //   navigate(`/guest/profile`);

      // })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Login failed. Please check your credentials and try again.");
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate(`/guest/profile`);
    }
  }, []);

  // useEffect(() => {
  //   const storedId = localStorage.getItem("tenantId");
  //   if (storedId) navigate(`/guest/tenant/${storedId}`);
  // }, []);

  return (
    <div className="p-6 flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl w-1/3 p-8 transition-all duration-300 hover:shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <User className="w-8 h-8 text-teal-600" />
          <h1 className="text-3xl font-bold text-teal-800">Login</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Username
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-teal-500">
              <User className="text-teal-600 mr-2 w-5 h-5" />
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                className="outline-none w-1/2"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-600 mb-1"
            >
              Password
            </label>
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-teal-500">
              <Lock className="text-teal-600 mr-2 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                className="outline-none w-full"
                required
              />
              <div
                className="ml-2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg mt-4 transition-all duration-300 shadow-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainLoginPage;
