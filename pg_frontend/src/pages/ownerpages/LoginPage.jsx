import React, { useState, useEffect,useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [adminLogin, setAdminLogin] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();
  

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setAdminLogin({ ...adminLogin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(adminLogin),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Login failed");
        return response.json();
      })
      .then((data) => {
        const jwt= data.token;
        localStorage.setItem("token",`Bearer ${jwt}`);
        navigate("/dashboard");
        // navigate("/admin/dashboard");
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Login failed. Please check your credentials and try again.");
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl px-8 py-10 w-96 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={adminLogin.username}
              onChange={handleChanges}
              placeholder="Enter your username"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={adminLogin.password}
              onChange={handleChanges}
              placeholder="Enter your password"
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200 shadow-sm"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
